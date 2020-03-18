const assert = require("assert");
const fs = require("fs");
const util = require("util");
const path = require("path");

const stat = util.promisify(fs.stat);
const readFile = util.promisify(fs.readFile);

describe(".env", () => {
  const filePath = path.join(process.cwd(), ".env");
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
  // 6.2
  it("should be ignored in the .gitignore file", async () => {
    const gitIgnorePath = path.join(process.cwd(), ".gitignore");
    const gitIgnoreFile = await readFile(gitIgnorePath, "utf8");
    const lines = gitIgnoreFile.split("\n");
    let hasMatch = false;
    for (const line of lines) {
      if (line.match(/^.env/)) {
        hasMatch = true;
      }
    }
    assert.ok(hasMatch, ".env is not added to the .gitignore file");
  });
  // 6.3
  it('should have the key MESSAGE_STYLE with a value "uppercase"', async () => {
    const envFile = await readFile(filePath, "utf8");
    const lines = envFile.split("\n");
    let hasMatch = false;
    for (const line of lines) {
      if (line.match(/^MESSAGE_STYLE/)) {
        hasMatch = !!line.match(/(\"\')?uppercase(\"\')?/);
      }
    }
    assert.ok(hasMatch, 'MESSAGE_STYLE should equal "uppercase"');
  });
});
