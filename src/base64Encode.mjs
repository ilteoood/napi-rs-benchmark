import { randomUUID } from 'crypto';
import { Bench } from 'tinybench';

import { base64Encode } from '../@napi/benchmark/index.js';
import { resultComparator } from './resultComparator.mjs';

export const base64EncodeTest = async () => {
    for (let i = 0; i< 10 ; i++) {
        const word = randomUUID();

        const bench = new Bench({ time: 1000 });

        let rustResult, jsResult;

        bench
            .add(`Rust base64 encode`, () => rustResult = base64Encode(word))
            .add(`JS base64 encode`, () => jsResult = Buffer.from(word).toString('base64'))

        await bench.run();

        resultComparator(rustResult, jsResult);

        console.table(bench.table());
    }
}