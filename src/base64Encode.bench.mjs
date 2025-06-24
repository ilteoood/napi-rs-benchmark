import { randomUUID } from 'crypto';
import { bench, describe } from 'vitest';

import { base64Encode } from '../@napi/benchmark/index.js';
import * as wasm from '../wasm-pack/pkg/wasm_pack.js';
import { resultComparator } from './resultComparator.mjs';

for (let i = 0; i < 10; i++) {
  describe(`base64 encode benchmark ${i}`, () => {
    const word = randomUUID();
    let rustResult, jsResult, wasmResult;

    bench('NAPI base64 encode', async () => {
      rustResult = base64Encode(word);
    });

    bench('JS base64 encode', async () => {
      jsResult = Buffer.from(word).toString('base64');
    });

    bench('WASM base64 encode', async () => {
      wasmResult = wasm.base64_encode(word);
    });

    resultComparator(rustResult, jsResult, wasmResult);
  });
}
