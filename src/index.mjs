import { arraySumTest } from "./arraySum.mjs";
import { base64EncodeTest } from "./base64Encode.mjs";
import { fastUriTest } from './fastUri.mjs';
import { jsonStringifyTest } from "./jsonStringify.mjs";

await fastUriTest();
await arraySumTest();
await base64EncodeTest();
await jsonStringifyTest();