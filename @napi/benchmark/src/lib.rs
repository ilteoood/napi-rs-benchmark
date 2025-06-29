#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

use base64::prelude::*;
use url::Url;

#[napi]
pub fn json_stringify(array: Vec<u32>) -> String {
  serde_json::to_string(&array).unwrap()
}

#[napi]
pub fn base64_encode(to_encode: String) -> String {
  BASE64_STANDARD.encode(to_encode)
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
  let parsed_url = Url::parse(&uri).unwrap();

  Parsed {
    scheme: parsed_url.scheme().to_owned(),
    userinfo: format!(
      "{}:{}",
      parsed_url.username(),
      parsed_url.password().unwrap()
    ),
    host: parsed_url.host_str().unwrap().to_owned(),
    port: parsed_url.port().unwrap(),
    path: parsed_url.path().to_owned(),
    query: parsed_url.query().unwrap().to_owned(),
    fragment: parsed_url.fragment().unwrap().to_owned(),
    reference: String::from("uri"),
  }
}

#[napi]
fn fibonacci(n: u32) -> u32 {
  match n {
    1 | 2 => 1,
    _ => fibonacci(n - 1) + fibonacci(n - 2),
  }
}

#[napi]
pub fn noop() {}
