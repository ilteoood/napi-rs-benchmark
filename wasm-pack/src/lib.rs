use wasm_bindgen::prelude::*;

use base64::{Engine as _, engine::{general_purpose}};

#[wasm_bindgen]
pub fn json_stringify(array: Vec<u32>) -> String {
  serde_json::to_string(&array).unwrap()
}

#[wasm_bindgen]
pub fn base64_encode(to_encode: String) -> String {
  let mut buf = String::new();

  general_purpose::STANDARD.encode_string(&to_encode, &mut buf);

  buf
}

#[wasm_bindgen]
pub fn array_sum(array: Vec<u32>) -> u32 {
  let mut sum = 0;

  for value in array {
    sum += value;
  }

  sum
}