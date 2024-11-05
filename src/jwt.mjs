import nodeRsJwt from '@node-rs/jsonwebtoken';
import esMain from 'es-main';
import { createSigner } from 'fast-jwt';
import { Bench } from 'tinybench';

export const jwtTest = async () => {
    for (let i = 0; i < 10; i++) {
        const payload = { a: 1, b: 2, c: 3 };
        const algorithm = 'HS256';
        const key = 'secretsecretsecret';

        const fastjwtSign = createSigner({ algorithm, key, noTimestamp: true })
        const signOptions = { algorithm };

        const bench = new Bench({ time: 1000 });

        let rustResult, jsResult;

        bench
            .add(`NAPI JWT sign`, () => rustResult = nodeRsJwt.signSync(payload, key, signOptions))
            .add(`JS JWT sign`, () => jsResult = fastjwtSign(payload))

        await bench.run();

        console.table(bench.table());
    }
}

if (esMain(import.meta)) {
    jwtTest();
}