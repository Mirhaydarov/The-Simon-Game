import { curry, compose } from '../../utils';

// eslint-disable-next-line import/prefer-default-export
export const setTextToElement = (value, element) => {
  const el = element;
  el.textContent = value;
};

const csv = (value) => `Your turn: ${value} Tap${value > 1 ? 's' : ''}`;

const currySetTextToElement = curry(setTextToElement);

const showTotalTurn = compose(
  currySetTextToElement,
  csv,
);

export { showTotalTurn };
