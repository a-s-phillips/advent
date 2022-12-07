import * as R from "https://deno.land/x/ramda@v0.27.2/mod.ts";

type Cell = string | undefined;
type Stack = Cell[];
type Grid = Stack[];
type Instruction = number[];

const __dirname = new URL(".", import.meta.url).pathname;
const input: string[][] = R.splitWhen(
  R.equals(""),
  Deno.readTextFileSync(`${__dirname}input`).split("\n")
);

const crates: string[] = input[0];
const instructions: string[] = R.drop(1, input[1]);

export const parseCrateLine = (line: string): Stack => {
  const fn = R.compose(
    R.map(
      (str: string) =>
        R.filter(
          (char: string) => char !== " " && char !== "[" && char !== "]",
          str
        )[0]
    ),
    R.splitEvery(4)
  );
  return fn(line);
};

export const parseCrateArray = (array: string[]): Grid => {
  const fn = R.compose(
    R.map(R.filter((cell: Cell) => cell !== undefined)),
    R.transpose,
    R.map(parseCrateLine),
    R.dropLast(1)
  );
  return fn(array);
};

export const execInstruction = (grid: Grid, instruction: number[]): Grid => {
  const [quantity, origin, destination] = instruction;

  return grid.map((stack, i) => {
    if (i === origin) {
      return R.drop(quantity, grid[origin]);
    }
    if (i === destination) {
      return R.concat(R.take(quantity, grid[origin]), grid[destination]);
    }
    return stack;
  });
};

export const parseInstruction = (str: string) => {
  const execInstructionFactory = (instruction: Instruction) => (grid: Grid) =>
    execInstruction(grid, instruction);

  const strToArray = R.compose(
    R.map(parseInt),
    R.flatten,
    R.map(R.drop(1)),
    R.splitEvery(2),
    R.split(" ")
  );

  return execInstructionFactory(
    strToArray(str).map((x: number, i: number) => (i === 0 ? x : x - 1))
  );
};

export const processGrid = (grid: Grid, instructions: string[]): Grid => {
  const instructionFns = R.pipe(...R.map(parseInstruction, instructions));
  return instructionFns(grid);
};

console.log(processGrid(parseCrateArray(crates), instructions).map(x => x[0]).join(""));
