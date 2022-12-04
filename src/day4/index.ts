import * as R from "https://deno.land/x/ramda@v0.27.2/mod.ts";
import _isString from "https://deno.land/x/ramda@v0.27.2/source/internal/_isString.js";

const __dirname = new URL(".", import.meta.url).pathname;
const input: string[] = Deno.readTextFileSync(`${__dirname}input`).split(`\n`);

type Range = number[];
type RangePair = Range[];

export const rangeStrToArr = R.compose(
  R.map(parseInt),
  R.split("-"),
  (str: string) => {
    const regex = new RegExp("[0-9]+-[0-9]+");
    if (!regex.test(str)) {
      throw "Error";
    }

    return str;
  }
);

export const splitLineIntoRangeArrs = R.compose(
  R.map(rangeStrToArr),
  R.split(",")
);

export const isWithinRange = (num: number, range: Range) =>
  num >= range[0] && num <= range[1];

export const checkForOverlap = (
  ranges: RangePair,
  isStrict?: boolean
): boolean => {
  const range0LowerWithinRange1 = isWithinRange(ranges[0][0], ranges[1]);
  const range0UpperWithinRange1 = isWithinRange(ranges[0][1], ranges[1]);
  const range1LowerWithinRange0 = isWithinRange(ranges[1][0], ranges[0]);
  const range1UpperWithinRange0 = isWithinRange(ranges[1][1], ranges[0]);

  return isStrict
    ? (range0LowerWithinRange1 && range0UpperWithinRange1) ||
        (range1LowerWithinRange0 && range1UpperWithinRange0)
    : range0LowerWithinRange1 ||
        range0UpperWithinRange1 ||
        range1LowerWithinRange0 ||
        range1UpperWithinRange0;
};

export const countOverlaps = (list: string[], isStrict?: boolean) =>
  R.reduce(
    (acc: number, value: string) =>
      checkForOverlap(
        splitLineIntoRangeArrs(value),
        isStrict ? isStrict : false
      )
        ? acc + 1
        : acc,
    0,
    list
  );

const answer1 = countOverlaps(input, true);
const answer2 = countOverlaps(input);

console.log(answer1);
console.log(answer2);
