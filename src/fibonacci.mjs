import esMain from 'es-main';
import { Bench } from 'tinybench';

import { fibonacci } from '../@napi/benchmark/index.js';
import * as wasm from '../wasm-pack/pkg/wasm_pack.js';
import { resultComparator } from './resultComparator.mjs';

const NUMBERS = [1, 10, 100, 1000]

const jsFibonacci = (n) => {
    if (n <= 1) return n;
    return jsFibonacci(n - 1) + jsFibonacci(n - 2);
}

export const fibonacciTest = async () => {
    for (const number of NUMBERS) {

        let rustResult, jsResult, wasmResult;

        const bench = new Bench({ time: 1000 });

        bench
            .add(`NAPI fibonacci for ${number}`, () => rustResult = fibonacci(number))
            .add(`JS fibonacci for ${number}`, () => jsResult = jsFibonacci(number))
            .add(`WASM fibonacci for ${number}`, () => wasmResult = wasm.fibonacci(number))

        await bench.run();

        resultComparator(rustResult, jsResult, wasmResult);

        console.table(bench.table());
    }
}

if (esMain(import.meta)) {
    fibonacciTest();
}