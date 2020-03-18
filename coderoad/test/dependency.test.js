const assert = require("assert");

const { doesNotThrow, isModuleInstalled } = require("./utils");

describe("package.json", () => {
  // 1.1.
  it('should have "express" installed', async () => {
    assert.ok(
      await doesNotThrow(() =>
        isModuleInstalled({
          name: "express",
          type: "dependency"
        })
      )
    );
  });
  // 6.4
  it('should have "dotenv" installed', async () => {
    assert.ok(
      await doesNotThrow(() =>
        isModuleInstalled({
          name: "dotenv",
          type: "devDependency"
        })
      )
    );
  });
});
