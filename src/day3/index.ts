import * as R from "https://deno.land/x/ramda@v0.27.2/mod.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const input: string = Deno.readTextFileSync(`${__dirname}input`);

const charToScore = (char: string) => {
  const num = char.charCodeAt(0);

  if (num >= 97) {
    return num - 96;
  }
  if (num >= 65 && num <= 90) {
    return num - 38;
  }

  throw Error("not a valid character number");
};

const processLine = (line: string) => {
  const splitInHalf = (line: string[]) => R.splitAt(line.length / 2, line);

  const findMatch = (strings: string[][]): string | undefined => {
    const filterChar = (char: string) =>
      R.filter((char2: string) => char2 === char, strings[1]).length !== 0
        ? char
        : undefined;

    return R.filter(
      (item: string | undefined) => item !== undefined,
      R.map(filterChar, strings[0])
    )[0];
  };

  const process = R.compose(charToScore, findMatch, splitInHalf, R.split(""));
  return process(line);
};

const processGroup = (group: string[]) => {
  const res = R.filter(
    (g: string) =>
      group[1].split("").includes(g) && group[2].split("").includes(g),
    group[0].split("")
  )[0];
  return charToScore(res);
};

const getAnswer1 = R.compose(R.sum, R.map(processLine), R.split("\n"));
const getAnswer2 = R.compose(
  R.sum,
  R.map(processGroup),
  R.splitEvery(3),
  R.split("\n")
);
console.log(`Answer 1: ${getAnswer1(input)}`);
console.log(getAnswer2(input));
