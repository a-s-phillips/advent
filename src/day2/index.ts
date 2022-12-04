/*
A,X - 1 - Rock
B,Y - 2 - Paper
C,Z - 3 - Scissors

Score is the value of the X Y or Z plus 0 for a loss, 3 for a draw, and 6 for a win
*/
import * as R from "https://deno.land/x/ramda@v0.27.2/mod.ts";

export type Name = "A" | "B" | "C" | "X" | "Y" | "Z";
export type Value = 1 | 2 | 3;
export interface Hand {
  names: Name[];
  value: Value;
  beats: Value;
  beatenBy: Value;
}

const __dirname = new URL(".", import.meta.url).pathname;
const input: string[] = Deno.readTextFileSync(`${__dirname}input`).split("\n");

export const hands: Hand[] = [
  { names: ["A", "X"], value: 1, beats: 3, beatenBy: 2 },
  { names: ["B", "Y"], value: 2, beats: 1, beatenBy: 3 },
  { names: ["C", "Z"], value: 3, beats: 2, beatenBy: 1 },
];

const charToHand = (line: Name): Hand =>
  hands.filter((hand) => hand.names[0] === line || hand.names[1] === line)[0];

const replaceWithHands = (line: Name[]): Hand[] => {
  return line.map(charToHand);
};

const replaceWithStrategicHands = (line: Name[]): Hand[] => {
  const hand1: Hand = charToHand(line[0]);
  let hand2: Hand = hand1;
  switch (line[1]) {
    case "X":
      hand2 = hands.filter((hand) => hand.value === hand1.beats)[0];
      break;
    case "Y":
      hand2 = hands.filter((hand) => hand.value === hand1.value)[0];
      break;
    case "Z":
      hand2 = hands.filter((hand) => hand.value === hand1.beatenBy)[0];
  }
  return [hand1, hand2];
};

const replaceWithScore = (round: Hand[]): number => {
  const handValue = round[1].value;
  if (round[0] === round[1]) {
    return 3 + handValue;
  }
  if (round[1].value === round[0].beatenBy) {
    return 6 + handValue;
  }
  return 0 + handValue;
};

const getProcessedInput = R.compose(
  R.map(R.split(" ")),
  R.filter((x: string) => x !== "")
);

const getAnswer1 = R.compose(
  R.sum,
  R.map(replaceWithScore),
  R.map(replaceWithHands),
  getProcessedInput
);

const getAnswer2 = R.compose(
  R.sum,
  R.map(replaceWithScore),
  R.map(replaceWithStrategicHands),
  getProcessedInput
);

console.log(`Answer 1: ${getAnswer1(input)}`);
console.log(`Answer 2: ${getAnswer2(input)}`);
