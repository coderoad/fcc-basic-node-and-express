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
  // 4.1
  it("should load styled html thanks to express.static middleware allowing css to load", () => {
    return request(server)
      .get("/style.css")
      .expect("Content-type", /css/)
      .expect(200)
      .then(response => {
        assert.ok(response.text.match(/body {/));
      });
  });
  after(() => {
    server.close();
  });
});
