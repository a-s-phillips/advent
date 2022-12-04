import {
  assertEquals,
  assertThrows,
  assert,
} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";

import {
  splitLineIntoRangeArrs,
  rangeStrToArr,
  countOverlaps,
  checkForOverlap,
  isWithinRange,
} from "../../src/day4/index.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const input: string[] = Deno.readTextFileSync(`${__dirname}input`).split(`\n`);

describe("rangeStrToArr", () => {
  const testData = "3-4";
  it("returns an array of two numbers", () => {
    assertEquals(rangeStrToArr(testData), [3, 4]);
  });
  it("throws an error if input is not in the form '<integer>-<integer>'", () => {
    assertThrows(rangeStrToArr("abc-def"), , );
  });
});

describe("splitLineIntoRangeArrs", () => {
  const testData = "1-2,3-4";
  it("splits a comma-seperated list of numerical ranges into two arrays of two numbers", () => {
    assertEquals(splitLineIntoRangeArrs(testData), [
      [1, 2],
      [3, 4],
    ]);
  });
});

describe("isWithinRange", () => {
  it("returns true if the number is within the range", () => {
    assert(isWithinRange(3, [1, 5]));
  });
  it("returns true if the number is equal to the first number in range", () => {
    assert(isWithinRange(1, [1, 5]));
  });
  it("returns true if the number is equal to the second number in range", () => {
    assert(isWithinRange(1, [1, 5]));
  });
  it("returns false if the number is lower than the first number in range", () => {
    assertEquals(isWithinRange(2, [3, 8]), false);
  });
  it("returns false if the number is higher than the second number in range", () => {
    assertEquals(isWithinRange(9, [3, 8]), false);
  });
});

describe("checkForOverlaps", () => {
  const testData = {
    seperate: [
      [2, 3],
      [7, 9],
    ],
    xOverYLower: [
      [2, 4],
      [3, 5],
    ],
    yOverXLower: [
      [2, 7],
      [1, 3],
    ],
    xOverYUpper: [
      [5, 11],
      [4, 9],
    ],
    yOverXUpper: [
      [4, 9],
      [5, 12],
    ],
    xCompleteOverlapY: [
      [1, 6],
      [2, 3],
    ],
    yCompleteOverlapX: [
      [3, 5],
      [2, 7],
    ],
  };
  describe("checkForStrictOverlaps", () => {
    it("returns true if range X completely contains Y", () => {
      assert(checkForOverlap(testData.xCompleteOverlapY, true));
    });
    it("returns true if Y completely overlaps X", () => {
      assert(checkForOverlap(testData.yCompleteOverlapX, true));
    });
    it("returns false if the two ranges are completely seperate", () => {
      assertEquals(checkForOverlap(testData.seperate, true), false);
    });
    it("returns false if the first range overlaps the second at only the lower end", () => {
      assertEquals(checkForOverlap(testData.xOverYLower, true), false);
    });
    it("returns false if the second range overlaps the first at only the lower end", () => {
      assertEquals(checkForOverlap(testData.yOverXLower, true), false);
    });
    it("returns false if the first range overlaps the second at only the upper end", () => {
      assertEquals(checkForOverlap(testData.xOverYUpper, true), false);
    });
    it("returns false if the second range overlaps the first at only the upper end", () => {
      assertEquals(checkForOverlap(testData.yOverXUpper, true), false);
    });
  });
  describe("checkForAnyOverlaps", () => {
    it("returns true if range X completely contains Y", () => {
      assert(checkForOverlap(testData.xCompleteOverlapY, false));
    });
    it("returns true if Y completely overlaps X", () => {
      assert(checkForOverlap(testData.yCompleteOverlapX, false));
    });
    it("returns false if the two ranges are completely seperate", () => {
      assertEquals(checkForOverlap(testData.seperate, false), false);
    });
    it("returns true if the first range overlaps the second at only the lower end", () => {
      assertEquals(checkForOverlap(testData.xOverYLower, false), true);
    });
    it("returns true if the second range overlaps the first at only the lower end", () => {
      assertEquals(checkForOverlap(testData.yOverXLower, false), true);
    });
    it("returns true if the first range overlaps the second at only the upper end", () => {
      assertEquals(checkForOverlap(testData.xOverYUpper, false), true);
    });
    it("returns true if the second range overlaps the first at only the upper end", () => {
      assertEquals(checkForOverlap(testData.yOverXUpper, false), true);
    });
  });
});

describe("countOverlaps", () => {
  const testData = [
    [
      [2, 4],
      [6, 8],
    ],
    [
      [2, 3],
      [4, 5],
    ],
    [
      [5, 7],
      [7, 9],
    ],
    [
      [2, 8],
      [3, 7],
    ],
    [
      [6, 6],
      [4, 6],
    ],
    [
      [2, 6],
      [4, 8],
    ],
  ];
  it("counts the number of instances in the array where two ranges completely overlap", () => {
    assertEquals(countOverlaps(input, true), 2);
  });
  it("counts the number of instances in the array where two ranges partially or completely overlap", () => {
    assertEquals(countOverlaps(input, true), 2);
  });
});
