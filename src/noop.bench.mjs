import { bench, describe } from 'vitest';

import { noop } from '../@napi/benchmark/index.js';
import * as wasm from '../wasm-pack/pkg/wasm_pack.js';
import { resultComparator } from './resultComparator.mjs';

describe('noop', () => {
    let rustResult, jsResult, wasmResult;

    bench('NAPI noop', () => noop());

    bench('JS noop', () => (function noop() { })());

    bench('WASM noop', () => wasm.noop());

    resultComparator(rustResult, jsResult, wasmResult);
});
