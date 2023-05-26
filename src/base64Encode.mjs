import { randomUUID } from 'crypto';
import { Bench } from 'tinybench';

import { base64Encode } from '../@napi/benchmark/index.js';
import * as wasm from '../wasm-pack/pkg/wasm_pack.js';
import { resultComparator } from './resultComparator.mjs';

export const base64EncodeTest = async () => {
    for (let i = 0; i < 10; i++) {
        const word = randomUUID();

        const bench = new Bench({ time: 1000 });

        let rustResult, jsResult, wasmResult;

        bench
            .add(`NAPI base64 encode`, () => rustResult = base64Encode(word))
            .add(`JS base64 encode`, () => jsResult = Buffer.from(word).toString('base64'))
            .add(`WASM base64 encode`, () => wasmResult = wasm.base64_encode(word))

        await bench.run();

        resultComparator(rustResult, jsResult, wasmResult);

        console.table(bench.table());
    }
}