import * as R from "https://deno.land/x/ramda@v0.27.2/mod.ts";
const __dirname = new URL(".", import.meta.url).pathname;
const input: string[] = Deno.readTextFileSync(`${__dirname}input`).split("");

const solve = (str: string[]) => {
  return str.reduce(
    (acc: number | null, _val: string, idx: number, arr: string[]) => {
      if (acc !== null) return acc;
      const fn = R.compose((segment: string[]) => {
        const set = new Set(segment);
        return set;
      }, R.slice(idx - 14, idx));

      const charSet: Set<string> = fn(arr);
      return charSet.size === 14 ? idx : null;
    },
    null
  );
};

console.log(solve(input));
