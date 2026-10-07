import assert from 'node:assert/strict';
import test from 'node:test';
import { constrainPlacement, initialPlacement } from '../features/storefront/print-placement.ts';

test('keeps rotated artwork inside desktop and mobile print fields at every supported size', () => {
  for (const width of [140, 256]) {
    const height = width * .33 / .9 / .4;
    for (let scale = 60; scale <= 150; scale += 5) {
      for (let angle = -45; angle <= 45; angle += 5) {
        for (const corner of [-100, 200]) {
          const p = constrainPlacement({ x: corner, y: corner, scale, angle }, width, height);
          const radians = angle * Math.PI / 180;
          const half = width * .38 * scale / 100 * (Math.abs(Math.cos(radians)) + Math.abs(Math.sin(radians))) / 2;
          assert.ok(p.x / 100 * width - half >= -1e-9);
          assert.ok(p.x / 100 * width + half <= width + 1e-9);
          assert.ok(p.y / 100 * height - half >= -1e-9);
          assert.ok(p.y / 100 * height + half <= height + 1e-9);
        }
      }
    }
  }
});

test('preserves a centred sample without mutating its input', () => {
  const value = { ...initialPlacement };
  assert.deepEqual(constrainPlacement(value, 256, 235), initialPlacement);
  assert.deepEqual(value, initialPlacement);
});
