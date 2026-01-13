const { divide } = require("../src/calc");

describe("divide", () => {
  test("positive: divides two numbers correctly", () => {
    expect(divide(6, 2)).toBe(3);
  });

  test("negative: first argument not a number throws TypeError", () => {
    expect(() => divide("6", 2)).toThrow(TypeError);
    expect(() => divide("6", 2)).toThrow("Both arguments must be numbers");
  });

  test("negative: second argument not a number throws TypeError", () => {
    expect(() => divide(6, { value: 2 })).toThrow(TypeError);
    expect(() => divide(6, { value: 2 })).toThrow(
      "Both arguments must be numbers"
    );
  });

  test("negative: NaN argument throws TypeError", () => {
    expect(() => divide(NaN, 2)).toThrow(TypeError);
    expect(() => divide(NaN, 2)).toThrow("Arguments cannot be NaN");
  });

  test("negative: division by zero throws RangeError", () => {
    expect(() => divide(6, 0)).toThrow(RangeError);
    expect(() => divide(6, 0)).toThrow("Division by zero is not allowed");
  });
});