const assert = require("assert");
const sinon = require("sinon");

describe("server", () => {
  // 1.2
  it('should log "Hello World"', () => {
    const spy = sinon.spy(console, "log");
    // spy on the server
    const server = require("../src/server");
    const isCalled = spy.called
    const result = spy.calledWith("Hello World");
    // ensure connection is closed 
    server.close();
    assert.ok(isCalled, 'console.log not called')
    assert.ok(result, '"Hello World was not logged');
  }).timeout(1000)
});
