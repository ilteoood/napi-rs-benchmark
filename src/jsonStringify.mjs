import { Bench } from 'tinybench';

import { stringify } from '../@napi/benchmark/index.js';

const SIZES = [1, 10, 100, 1000, 10_000, 100_000, 1_000_000]

export const jsonStringify = async () => {
    for (const size of SIZES) {

        const numberToFill = Math.ceil(Math.random() * SIZES.at(-1))
        const array = new Array(size).fill(numberToFill);
        const bench = new Bench({ time: 1000 });

        bench
            .add(`Rust stringify ${size}`, () => stringify(array))
            .add(`JSON stringify ${size}`, () => JSON.stringify(array))

        await bench.run();

        console.table(bench.table());
    }
}