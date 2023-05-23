#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

use base64::{Engine as _, engine::{general_purpose}};

#[napi]
pub fn json_stringify(vector: Vec<u32>) -> String {
  serde_json::to_string(&vector).unwrap()
}

#[napi]
pub fn base64_encode(to_encode: String) -> String {
  let mut buf = String::new();

  general_purpose::STANDARD.encode_string(&to_encode, &mut buf);

  buf
}