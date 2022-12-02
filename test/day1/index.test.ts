import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";
import {
  groupNumbers,
  getAnswer,
} from "../../src/day1/index.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const input: string = Deno.readTextFileSync(__dirname + "/input");

describe("Day 1", () => {
  describe("groupNumbers", () => {
    const result = groupNumbers(input);
    it(`returns a list whose length is the same as the number of groups in the 
    input`, () => {
      assertEquals(result.length, 3);
    });

    it("contains only integers (i.e. no null or NaN)", () => {
      result.forEach((item) => {
        assertEquals(item.filter((x) => isNaN(x) || x === null).length, 0);
      });
    });

    it(`returns a list of lists where each child list has exactly the same 
    values as the non-zero values on each line of the input`, () => {
      assertEquals(result, [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);
    });
  });

  describe("getAnswer", () => {
    it(`takes in a list of groups of numbers with each group seperated by an
    empty newline, and sums each group, then orders the sums of each group
    in descending order`, () => {
      assertEquals(getAnswer(input), [24, 15, 6]);
    });
  });
});
