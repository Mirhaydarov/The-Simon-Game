// eslint-disable-next-line import/prefer-default-export
export const filterTile = (tileList, value) => {
  const list = [...tileList.childNodes];
  // eslint-disable-next-line no-shadow
  const tile = list.filter((tile) => tile.getAttribute('data-tile') === value);
  return tile[0];
};
