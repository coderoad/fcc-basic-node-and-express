const assert = require("assert");
const request = require("supertest");
const server = require("../src/server");

describe("server", () => {
  // 2.1
  it('should return "Hello Express" when GET "/" is called', () => {
    return request(server)
      .get("/")
      .expect(200)
      .then(response => {
        assert.equal(response.text, "Hello Express");
      });
  });
  after(() => {
    server.close();
  });
});
