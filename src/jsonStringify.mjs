import { Bench } from 'tinybench';

import { jsonStringify } from '../@napi/benchmark/index.js';
import { resultComparator } from './resultComparator.mjs';

const SIZES = [1, 10, 100, 1000, 10_000, 100_000, 1_000_000]

export const jsonStringifyTest = async () => {
    for (const size of SIZES) {

        const numberToFill = Math.ceil(Math.random() * SIZES.at(-1))
        const array = new Array(size).fill(numberToFill);
        const bench = new Bench({ time: 1000 });

        let rustResult, jsResult;

        bench
            .add(`Rust stringify ${size}`, () => rustResult = jsonStringify(array))
            .add(`JSON stringify ${size}`, () => jsResult = JSON.stringify(array))

        await bench.run();

        resultComparator(rustResult, jsResult);

        console.table(bench.table());
    }
}