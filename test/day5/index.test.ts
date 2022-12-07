import {
  assertEquals
} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";
import {
  parseCrateLine,
  parseCrateArray,
  parseInstruction,
  execInstruction,
  processGrid,
} from "../../src/day5/index.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const crates: string[] = Deno.readTextFileSync(`${__dirname}crates`).split(
  "\n"
);

describe("processCrateLine", () => {
  it(`given a correctly formatted 'crate' string, it returns a simplified
     array where a crate is represented by a single character and an absence
     is represented by undefined`, () => {
    assertEquals<(string | undefined)[]>(parseCrateLine(crates[0]), [
      undefined,
      "D",
      undefined,
    ]);
  });
});

describe("parseCrateArray", () => {
  it(`given a correctly formatted 'crate' array, it returns a new array where
  each line is simplified and the whole array is transposed so that each row
  represents a single column of crates`, () => {
    assertEquals(parseCrateArray(crates), [["N", "Z"], ["D", "C", "M"], ["P"]]);
  });
});

describe("parseInstruction", () => {
  const testData = [["N", "Z"], ["D", "C", "M"], ["P"]];
  it(`given a text instruction it returns a function which accepts a grid as
  input and applies the instruction to it`, () => {
    assertEquals(parseInstruction("move 1 from 2 to 1")(testData), [
      ["D", "N", "Z"],
      ["C", "M"],
      ["P"],
    ]);
  });
});

describe("execInstruction", () => {
  const testData = [["N", "Z"], ["D", "C", "M"], ["P"]];
  it(`returns a grid having correctly executed the manipulation based on the
  instruction set passed in`, () => {
    assertEquals(execInstruction(testData, [1, 1, 0]), [
      ["D", "N", "Z"],
      ["C", "M"],
      ["P"],
    ]);
  });
});

describe("processGrid", () => {
  it("given a grid and a set of instruction strings, it parses and applies each instruction in turn", () => {
    const crates = [["N", "Z"], ["D", "C", "M"], ["P"]];
    const instructions = [
      "move 1 from 2 to 1",
      "move 3 from 1 to 3",
      "move 2 from 2 to 1",
      "move 1 from 1 to 2",
    ];

    assertEquals(processGrid(crates, instructions), [
      ["C"],
      ["M"],
      ["Z", "N", "D", "P"],
    ]);
  });
});
