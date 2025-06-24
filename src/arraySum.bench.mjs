import { bench, describe } from 'vitest';

import { arraySum } from '../@napi/benchmark/index.js';
import * as wasm from '../wasm-pack/pkg/wasm_pack.js';
import { resultComparator } from './resultComparator.mjs';

const SIZES = [1, 10, 100, 1000];

for (const size of SIZES) {
  describe(`array sum benchmark ${size}`, () => {
    const numberToFill = Math.ceil(Math.random() * SIZES.at(-1));
    const array = new Array(size).fill(numberToFill);
    let rustResult, jsResult, wasmResult;

    bench('NAPI array sum', async () => {
      rustResult = arraySum(array);
    });

    bench('JS array sum', async () => {
      jsResult = array.reduce((a, b) => a + b, 0);
    });

    bench('WASM array sum', async () => {
      wasmResult = wasm.array_sum(array);
    });

    resultComparator(rustResult, jsResult, wasmResult);
  });
}