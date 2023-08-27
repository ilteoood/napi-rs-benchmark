#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

use base64::{engine::general_purpose, Engine as _};
use url::Url;

#[napi]
pub fn json_stringify(array: Vec<u32>) -> String {
  serde_json::to_string(&array).unwrap()
}

#[napi]
pub fn base64_encode(to_encode: String) -> String {
  let mut buf = String::new();

  general_purpose::STANDARD.encode_string(&to_encode, &mut buf);

  buf
}

#[napi]
pub fn array_sum(array: Vec<u32>) -> u32 {
  let mut sum = 0;

  for value in array {
    sum += value;
  }

  sum
}

#[napi(object)]
pub struct Parsed {
  pub scheme: String,
  pub userinfo: String,
  pub host: String,
  pub port: u16,
  pub path: String,
  pub query: String,
  pub fragment: String,
  pub reference: String,
}

#[napi]
pub fn uri_parse(uri: String) -> Parsed {
  let parsed_url = Url::parse(uri.as_str()).unwrap();

  let userinfo = [parsed_url.username(), parsed_url.password().unwrap()].join(":");

  Parsed {
    scheme: parsed_url.scheme().to_string(),
    userinfo,
    host: parsed_url.host_str().unwrap().to_string(),
    port: parsed_url.port().unwrap(),
    path: parsed_url.path().to_string(),
    query: parsed_url.query().unwrap().to_string(),
    fragment: parsed_url.fragment().unwrap().to_string(),
    reference: String::from("uri"),
  }
}
