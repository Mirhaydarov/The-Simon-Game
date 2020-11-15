/* eslint-disable no-unused-vars */
import { sum } from './sum';

// eslint-disable-next-line import/prefer-default-export
export const playRound = (nextSequence, cb, difficult) => {
  nextSequence.map((color, index) => setTimeout(() => {
    cb(color);
  }, (index + 1) * sum(difficult, 1100)));
};
