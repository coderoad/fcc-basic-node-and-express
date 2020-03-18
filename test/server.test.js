const assert = require("assert");
const request = require("supertest");
const server = require("../src/server");
const {
  promises: { readFile }
} = require("fs");
const path = require("path");
const sinon = require("sinon");
let sandbox = sinon.createSandbox();

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
  // 6.5
  it("should load the dotenv config", async () => {
    const serverFilePath = path.join(process.cwd(), "src", "server.js");
    const serverFile = await readFile(serverFilePath, "utf8");
    const lines = serverFile.split("/n");
    const firstLines = lines.slice(0, 5);
    let match = false;
    for (const line of firstLines) {
      if (line.match(/require.+dotenv.+\.config()/)) {
        match = true;
      }
    }
    assert.ok(match, "should load dotenv config at the top of the file");
  });
  // 6.6
  it('should return json from the "/json" endpoint', () => {
    sandbox.stub(process.env, "MESSAGE_STYLE").value("");
    return request(server)
      .get("/json")
      .expect("Content-type", /application\/json/)
      .expect(200)
      .then(response => {
        assert.ok(response.body, "Body does not contain json");
        assert.equal(
          response.body.message,
          "Hello json",
          'Message should be "Hello json"'
        );
      });
    sandbox.restore();
  });
  it('should return json from the "/json" endpoint', () => {
    sandbox.stub(process.env, "MESSAGE_STYLE").value("uppercase");
    return request(server)
      .get("/json")
      .expect("Content-type", /application\/json/)
      .expect(200)
      .then(response => {
        assert.ok(response.body, "Body does not contain json");
        assert.equal(
          response.body.message,
          "HELLO JSON",
          'Message should be "HELLO JSON" when process.env.MESSAGE_STYLE is "uppercase"'
        );
      });
    sandbox.restore();
  });
  after(() => {
    server.close();
  });
});
