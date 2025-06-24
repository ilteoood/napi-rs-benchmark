import nodeRsJwt from '@node-rs/jsonwebtoken';
import { createSigner } from 'fast-jwt';
import { bench, describe } from 'vitest';

for (let i = 0; i < 10; i++) {
  describe(`jwt benchmark ${i}`, () => {
    const payload = { a: 1, b: 2, c: 3 };
    const algorithm = 'HS256';
    const key = 'secretsecretsecret';

    const fastjwtSign = createSigner({ algorithm, key, noTimestamp: true })
    const signOptions = { algorithm };

    let rustResult, jsResult;

    bench('NAPI JWT sign', async () => {
      rustResult = nodeRsJwt.signSync(payload, key, signOptions);
    });

    bench('JS JWT sign', async () => {
      jsResult = fastjwtSign(payload);
    });
  });
}
