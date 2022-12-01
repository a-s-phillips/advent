import * as R from "https://deno.land/x/ramda@v0.27.2/mod.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const input: string = Deno.readTextFileSync(__dirname + "input");

export function groupNumbers(input: string): Array<Array<number>> {
  const res = input.split("\n\n").map((group) =>
    group
      .split("\n")
      .map((str) => parseInt(str))
      .filter((x) => x % 1 === 0)
  );
  return res;
}

export const getAnswer = R.compose(
  R.sort((a: number, b: number) => b - a),
  R.map(R.sum),
  groupNumbers
);

const answerList = getAnswer(input);
const answer1 = answerList[0];
const answer2 = R.sum([answerList[0], answerList[1], answerList[2]]);

console.log(`Answer 1: ${answer1}`);
console.log(`Answer 2: ${answer2}`);
