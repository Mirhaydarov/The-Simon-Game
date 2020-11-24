import { sum } from './sum';

export const playRound = (nextSequence, cb, difficult) => {
  nextSequence.map((color, index) => setTimeout(() => {
    cb(color);
  }, (index + 1) * sum(difficult, 1100)));
};
