#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;
extern crate serde_json;

#[napi]
pub fn stringify(vector: Vec<u32>) -> String {
  serde_json::to_string(&vector).unwrap()
}