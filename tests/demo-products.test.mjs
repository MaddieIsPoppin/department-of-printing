import assert from 'node:assert/strict';
import test from 'node:test';
import { createDemoProducts } from '../data/demo-products.ts';

test('demo archive is deterministic, isolated and links only to its source garments', () => {
  const source = [{ slug: 'real-hoodie', name: 'Real hoodie', garmentType: 'hoodie', genres: ['graphic'], price: 350, available: true, colours: ['Black'], sizes: ['M'], media: { cover: { src: '/hoodie.png' }, details: [{ src: '/hoodie-back.png' }] } }];
  const original = structuredClone(source);
  const demo = createDemoProducts(source);
  assert.equal(demo.length, 40);
  assert.equal(new Set(demo.map(p => p.slug)).size, 40);
  assert.deepEqual(demo, createDemoProducts(source));
  assert.deepEqual(source, original);
  for (const item of demo) {
    assert.equal(item.sourceSlug, source[0].slug);
    assert.equal(item.garmentType, 'hoodie');
    assert.equal(item.preview, true);
    assert.equal(item.price, null);
    assert.equal(item.available, null);
    assert.deepEqual(item.sizes, []);
    assert.deepEqual(item.colours, []);
    assert.ok(['/hoodie.png', '/hoodie-back.png'].includes(item.media.cover.src));
  }
  assert.deepEqual(createDemoProducts([]), []);
});
