import { assert } from "chai";
import { isEqual } from "./isEqual";

describe("isEqual usage", () => {
  it("string and string should return true", () => {
    assert.equal(isEqual("mocha", "mocha"), true);
  });

  it("mocha and hello should return false", () => {
    assert.equal(isEqual("mocha", "hello"), false);
  });

  it("123 and 123 should return true", () => {
    assert.equal(isEqual(123, 123), true);
  });

  it("123 and 321 should return false", () => {
    assert.equal(isEqual(123, 321), false);
  });

  it("{a:1} and  {a:1} should return true", () => {
    assert.equal(isEqual({a:1}, {a:1}), true);
  });

  it("{a:1} and  {a:2} should return false", () => {
    assert.equal(isEqual({a:1}, {a:2}), false);
  });

  it("{a:1} and string should return false", () => {
    assert.equal(isEqual({a:1}, ""), false);
  });

  it("{a:1} and [1,2] should return false", () => {
    assert.equal(isEqual({a:1}, [1,2]), false);
  });

});
