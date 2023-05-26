import assert from 'assert'

export const resultComparator = (rustResult, jsResult, wasmResult) => {
    assert.deepEqual(rustResult, jsResult, `rustResult !== jsResult`)
    assert.deepEqual(jsResult, wasmResult, `jsResult !== wasmResult`)
}