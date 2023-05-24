export const resultComparator = (rustResult, jsResult) => {
    const sameResult = rustResult === jsResult
    console.log(`Same result: ${sameResult}`)

    if(!sameResult) {
        console.log(`Rust result: ${rustResult}`)
        console.log(`JS result: ${jsResult}`)
        throw new Error('Results does not match')
    }
}