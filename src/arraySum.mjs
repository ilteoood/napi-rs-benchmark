import { Bench } from 'tinybench';

import { arraySum } from '../@napi/benchmark/index.js';
import * as wasm from '../wasm-pack/pkg/wasm_pack.js';
import { resultComparator } from './resultComparator.mjs';

const SIZES = [1, 10, 100, 1000]

export const arraySumTest = async () => {
    for (const size of SIZES) {

        const numberToFill = Math.ceil(Math.random() * SIZES.at(-1))
        const array = new Array(size).fill(numberToFill);
        const bench = new Bench({ time: 1000 });

        let rustResult, jsResult, wasmResult;

        bench
            .add(`Rust array sum ${size}`, () => rustResult = arraySum(array))
            .add(`JSON array sum ${size}`, () => jsResult = array.reduce((a, b) => a + b, 0))
            .add(`WASM array sum ${size}`, () => wasmResult = wasm.array_sum(array))

        await bench.run();

        resultComparator(rustResult, jsResult, wasmResult);

        console.table(bench.table());
    }
}