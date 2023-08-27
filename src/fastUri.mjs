import esMain from 'es-main';
import fastUri from 'fast-uri';
import { Bench } from 'tinybench';

import { uriParse } from '../@napi/benchmark/index.js';
import * as wasm from '../wasm-pack/pkg/wasm_pack.js';

const URI = 'uri://user:pass@example.com:123/one/two.three?q1=a1&q2=a2#body'

export const fastUriTest = async () => {
    for (let i = 0; i < 10; i++) {
        const bench = new Bench({ time: 1000 });

        let rustResult, jsResult, wasmResult;

        bench
            .add(`NAPI URI`, () => rustResult = uriParse(URI))
            .add(`JS URI`, () => jsResult = fastUri.parse(URI))
            .add(`WASM URI`, () => wasmResult = wasm.uri_parse(URI))

        await bench.run();

        // resultComparator(rustResult, jsResult, wasmResult);

        console.table(bench.table());
    }
}

if (esMain(import.meta)) {
    fastUriTest();
}