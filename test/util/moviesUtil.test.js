const { formatToUSD } = require("../../src/util/moviesUtil");

describe("formatToUSD", () => {
  test("should format integers to US dollar format", () => {
    expect(formatToUSD(1000)).toBe("$1,000.00");
    expect(formatToUSD(123456789)).toBe("$123,456,789.00");
    expect(formatToUSD(50)).toBe("$50.00");
    expect(formatToUSD(0)).toBe("$0.00");
    expect(formatToUSD(1000000)).toBe("$1,000,000.00");
  });

  test("should throw an error for non-integer input", () => {
    expect(() => formatToUSD("1000")).toThrow(TypeError);
    expect(() => formatToUSD(1000.5)).toThrow(TypeError); // Decimal number
    expect(() => formatToUSD(null)).toThrow(TypeError);
    expect(() => formatToUSD(undefined)).toThrow(TypeError);
    expect(() => formatToUSD({})).toThrow(TypeError);
  });
});
