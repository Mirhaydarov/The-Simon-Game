// eslint-disable-next-line import/prefer-default-export
export const curry = (f) => (a) => (b) => f(a, b);
