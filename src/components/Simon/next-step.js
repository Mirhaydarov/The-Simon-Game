/* eslint-disable import/prefer-default-export */
export const nextStep = () => {
  const tiles = ['red', 'green', 'blue', 'yellow'];
  const random = tiles[Math.floor(Math.random() * tiles.length)];

  return random;
};
