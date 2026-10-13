import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { variants, addBagItem, validateBag, subtotalMinor, bagMessage } from '../features/commerce/bag.ts';
import { validateEnquiry } from '../features/enquiries/validation.ts';
import { recordAndDeliver, RateLimitError } from '../features/enquiries/delivery.ts';
import { products as realProducts } from '../data/products.ts';
import { access } from 'node:fs/promises';

// Test fixtures only; never imported by the app or published as inventory.
const product = { slug:'verified-fixture',name:'Test garment',price:123.45,currency:'ZAR',available:true,sizes:['M','L'],colours:['Black','Cream'] };
const products=[product], item={slug:product.slug,variantId:'M:Black',quantity:2};
test('real product routes are unique and all configured images exist',async()=>{
  assert.equal(new Set(realProducts.map(p=>p.slug)).size,realProducts.length);
  for(const p of realProducts){
    assert.match(p.slug,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    for(const image of [p.media.cover,p.media.front,p.media.back,...(p.media.details||[])].filter(Boolean)) await access(path.join(process.cwd(),'public',image.src));
  }
});
test('verified variants, merging, integer totals and stable IDs',()=>{
  assert.equal(variants(product).length,4);
  const bag=addBagItem([item],{...item,quantity:1},products);
  assert.equal(bag[0].quantity,3); assert.equal(subtotalMinor(bag,products),37035);
  assert.match(bagMessage(bag,products),/Test garment/);
  assert.deepEqual(validateBag(JSON.parse(JSON.stringify(bag)),products),bag);
});
test('bag rejects demo, missing data, tampering, duplicates and invalid quantities',()=>{
  const explicit={...product,variants:[{id:'m-black',size:'M',colour:'Black',available:true},{id:'l-black',size:'L',colour:'Black',available:false}]};
  assert.deepEqual(variants(explicit),[{id:'m-black',size:'M',colour:'Black'}]);
  for(const patch of [{sourceSlug:'real'},{price:null},{available:null},{available:false},{sizes:[]},{colours:[]},{currency:'USD'}]) assert.equal(variants({...product,...patch}).length,0);
  for(const patch of [{slug:'demo-any'},{variantId:'XL:Pink'},{quantity:0},{quantity:100},{quantity:1.5}]) assert.throws(()=>validateBag([{...item,...patch}],products));
  assert.throws(()=>validateBag([item,item],products));
  assert.throws(()=>validateBag([item],[{...product,price:null}]));
});
const input={kind:'order',name:'Test Customer',email:'customer@example.test',consent:true,items:[item],message:'Please confirm.'};
test('enquiries derive product information server-side and reject unsafe data',()=>{
  const enquiry=validateEnquiry({...input,subtotal:1,items:[{...item,price:.01}]},products);
  assert.match(enquiry.summary,/123[.,]45/);
  for(const patch of [{email:'bad'},{consent:false},{website:'spam'},{items:[]},{kind:'payment'},{name:'a\nb'}]) assert.throws(()=>validateEnquiry({...input,...patch},products));
  const custom={...input,kind:'custom',garment:'tee',colour:'Cream',sizes:'2 M',quantity:2,placement:'Front',reference:'Original illustration'};
  assert.match(validateEnquiry(custom,products).summary,/Quantity: 2/);
  assert.throws(()=>validateEnquiry({...custom,reference:'data:image/png;base64,abc'},products));
});
test('durable records precede delivery, failures survive and rate limit is shared',async()=>{
  const directory=await mkdtemp(path.join(tmpdir(),'dop-enquiry-test-'));
  try {
    const enquiry=validateEnquiry(input,products), options={directory,secret:'test-secret',identity:'test-client',now:1000000};
    const success=await recordAndDeliver(enquiry,{...options,send:async id=>assert.equal(JSON.parse(await readFile(path.join(directory,`${id}.json`),'utf8')).enquiry.email,input.email)});
    assert.equal(success.notification,'accepted');
    const failed=await recordAndDeliver(enquiry,{...options,send:async()=>{throw Error('provider offline');}});
    assert.equal(failed.notification,'failed');
    assert.equal(JSON.parse(await readFile(path.join(directory,`${failed.id}.json`),'utf8')).status,'awaiting_confirmation');
    await recordAndDeliver(enquiry,{...options,send:async()=>{}});
    await assert.rejects(recordAndDeliver(enquiry,{...options,send:async()=>{}}),RateLimitError);
  } finally {
    assert.ok(path.resolve(directory).startsWith(path.join(path.resolve(tmpdir()),'dop-enquiry-test-')));
    await rm(directory,{recursive:true,force:true});
  }
});
