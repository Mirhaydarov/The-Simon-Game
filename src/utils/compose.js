// eslint-disable-next-line import/prefer-default-export
export const compose = (...fns) => (arg) => fns.reduceRight((acc, fn) => (acc ? fn(acc) : fn), arg);
