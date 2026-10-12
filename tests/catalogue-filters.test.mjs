import assert from 'node:assert/strict';
import test from 'node:test';
import { catalogueSelection, filterProducts, catalogueHref } from '../features/storefront/catalogue-filters.ts';

const pieces = [
  { slug: 'a', garmentType: 'hoodie', genres: ['faith', 'mindset'] },
  { slug: 'b', garmentType: 'tee', genres: ['gym', 'mindset'] },
  { slug: 'c', garmentType: 'sweat', genres: ['graphic'] },
];
test('genre and garment intersect; multi-genre products appear only once', () => {
  assert.deepEqual(filterProducts(pieces, { genre: 'faith', type: 'hoodie' }).map(p => p.slug), ['a']);
  assert.deepEqual(filterProducts(pieces, { genre: 'mindset' }).map(p => p.slug), ['a', 'b']);
  assert.deepEqual(filterProducts(pieces, { genre: 'faith', type: 'tee' }), []);
  assert.equal(filterProducts(pieces, {}).length, 3);
});
test('invalid and repeated query values safely resolve to All independently', () => {
  assert.deepEqual(catalogueSelection(pieces, { genre: 'unknown', type: 'tee' }), { genre: undefined, type: 'tee' });
  assert.deepEqual(catalogueSelection(pieces, { genre: ['faith', 'gym'], type: ['tee'] }), { genre: undefined, type: undefined });
});
test('clearing one dimension preserves the other in shareable URLs', () => {
  assert.equal(catalogueHref({ genre: 'faith', type: 'hoodie' }), '/catalogue?genre=faith&type=hoodie');
  assert.equal(catalogueHref({ genre: undefined, type: 'hoodie' }), '/catalogue?type=hoodie');
  assert.equal(catalogueHref({ genre: 'faith', type: undefined }), '/catalogue?genre=faith');
  assert.equal(catalogueHref({}), '/catalogue');
});
