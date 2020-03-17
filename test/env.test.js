const assert = require("assert");
const fs = require("fs");
const util = require("util");
const path = require("path");

const stat = util.promisify(fs.stat);

describe(".env", () => {
  it("should have a file", async () => {
    const filePath = path.join(process.cwd(), ".env");
    const hasEnv = await stat(filePath).catch((err) => {
      if (err) {
        console.error(err);
        return false;
      }
      return true;
    });
    assert.ok(hasEnv);
  });
});
