import { bench, describe } from 'vitest';

import { fibonacci } from '../@napi/benchmark/index.js';
import * as wasm from '../wasm-pack/pkg/wasm_pack.js';
import { resultComparator } from './resultComparator.mjs';

const jsFibonacci = (n) => {
    if (n <= 1) return n;
    return jsFibonacci(n - 1) + jsFibonacci(n - 2);
}

const NUMBERS = [1, 10, 100, 1000];

for (const number of NUMBERS) {
  describe(`fibonacci benchmark ${number}`, () => {
    let rustResult, jsResult, wasmResult;

    bench('NAPI fibonacci', async () => {
      rustResult = fibonacci(number);
    });

    bench('JS fibonacci', async () => {
      jsResult = jsFibonacci(number);
    });

    bench('WASM fibonacci', async () => {
      wasmResult = wasm.fibonacci(number);
    });

    resultComparator(rustResult, jsResult, wasmResult);
  });
}
