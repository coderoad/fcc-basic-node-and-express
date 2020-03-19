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
  // 7.1
  it("should have `method path - ip` logger middleware", async () => {
    const spy = sinon.spy(console, "log");
    await request(server).get("/json");
    const result = spy.calledWith("GET /json - ::ffff:127.0.0.1");
    assert.ok(result);
  });
  // 8.1
  it('should return json `{ time: timestamp }` from the "/now" endpoint', () => {
    return request(server)
      .get("/now")
      .expect("Content-type", /application\/json/)
      .expect(200)
      .then(response => {
        assert.ok(response.body, "Body does not contain json");
        // TODO: validate uses middleware
        const now = +new Date();
        const sendTime = +new Date(response.body.time);
        const withinRange = now - sendTime < 3000;
        assert.ok(
          withinRange,
          `Timestamp ${response.body.time} is not within range of 3 seconds`
        );
      });
  });
  // 9.1
  it('should return `{ word: "hello" }` from GET requests to "/echo/hello"', () => {
    return request(server)
      .get("/echo/hello")
      .expect("Content-type", /application\/json/)
      .expect(200)
      .then(response => {
        assert.ok(response.body, "Body does not contain json");
        assert.equal(response.body.echo, "hello");
      });
  });
  it('should return `{ word: "ANYWORD" }` from GET requests to "/echo/ANYWORD"', () => {
    const randomWord =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);
    return request(server)
      .get(`/echo/${randomWord}`)
      .expect("Content-type", /application\/json/)
      .expect(200)
      .then(response => {
        assert.ok(response.body, "Body does not contain json");
        assert.equal(response.body.echo, randomWord);
      });
  });
  // 10.1
  it('should return `{ name: "FIRSTNAME LASTNAME" }` from GET requests to "/name?first=FIRSTNAME&last=LASTNAME"', () => {
    return request(server)
      .get("/name?first=FIRSTNAME&last=LASTNAME")
      .expect("Content-type", /application\/json/)
      .expect(200)
      .then(response => {
        assert.ok(response.body, "Body does not contain json");
        assert.equal(response.body.name, "FIRSTNAME LASTNAME");
      });
  });
  after(() => {
    server.close();
  });
});
