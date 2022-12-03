// deno-lint-ignore-file no-explicit-any
import { ArityOneFn } from "./types.ts";

export const compose =
  (...fns: ArityOneFn[]) =>
  (p: any) =>
    fns.reduceRight((acc: any, cur: any) => cur(acc), p);

export const map = (fn: ArityOneFn) => (functor: Array<any>) => functor.map(fn);

export const sum = (numbers: number[]) =>
  numbers.reduce((cur, val) => cur + val);
