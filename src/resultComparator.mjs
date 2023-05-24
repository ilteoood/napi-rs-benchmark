export const resultComparator = (rustResult, jsResult, wasmResult) => {
    const sameResult = rustResult === jsResult && jsResult === wasmResult
    console.log(`Same result: ${sameResult}`)

    if(!sameResult) {
        console.log(`Rust result: ${rustResult}`)
        console.log(`JS result: ${jsResult}`)
        console.log(`WASM result: ${wasmResult}`)
        throw new Error('Results does not match')
    }
}