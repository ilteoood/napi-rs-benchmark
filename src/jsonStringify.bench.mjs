import { bench, describe } from "vitest";

import { jsonStringify } from "../@napi/benchmark/index.js";
import * as wasm from "../wasm-pack/pkg/wasm_pack.js";
import { resultComparator } from "./resultComparator.mjs";

const SIZES = [1, 10, 100, 1000, 10_000, 100_000, 1_000_000];

for (const size of SIZES) {
  describe(`json stringify benchmark ${size}`, () => {
    const numberToFill = Math.ceil(Math.random() * SIZES.at(-1));
    const array = new Array(size).fill(numberToFill);
    let rustResult, jsResult, wasmResult;

    bench('NAPI stringify', async () => {
      rustResult = jsonStringify(array);
    });

    bench('JSON stringify', async () => {
      jsResult = JSON.stringify(array);
    });

    bench('WASM stringify', async () => {
      wasmResult = wasm.json_stringify(array);
    });

    resultComparator(rustResult, jsResult, wasmResult);
  });
}
