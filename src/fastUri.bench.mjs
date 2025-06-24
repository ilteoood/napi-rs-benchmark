import fastUri from 'fast-uri';
import { bench, describe } from 'vitest';

import { uriParse } from '../@napi/benchmark/index.js';
import * as wasm from '../wasm-pack/pkg/wasm_pack.js';

const URI = 'uri://user:pass@example.com:123/one/two.three?q1=a1&q2=a2#body';

for (let i = 0; i < 10; i++) {
  describe(`fast uri benchmark ${i}`, () => {
    let rustResult, jsResult, wasmResult;

    bench('NAPI URI', async () => {
      rustResult = uriParse(URI);
    });

    bench('JS URI', async () => {
      jsResult = fastUri.parse(URI);
    });

    bench('WASM URI', async () => {
      wasmResult = wasm.uri_parse(URI);
    });

    // resultComparator(rustResult, jsResult, wasmResult);
  });
}
