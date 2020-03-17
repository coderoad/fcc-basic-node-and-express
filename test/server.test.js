const assert = require("assert");
const request = require("supertest");
const server = require("../src/server");

describe("server", () => {
  // 3.1
  it('should return HTML when GET "/" is called', () => {
    return request(server)
      .get("/")
      .expect("Content-type", /html/)
      .expect(200)
      .then(response => {
        assert.ok(response.text.match(/<!DOCTYPE html>/));
      });
  });
  after(() => {
    server.close();
  });
});
