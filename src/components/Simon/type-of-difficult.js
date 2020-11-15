// eslint-disable-next-line import/prefer-default-export
export const typeOfDifficult = (difficult) => {
  switch (difficult) {
    case 'normal':
      return 1.5;

    case 'middle':
      return 1;

    case 'hard':
      return 0.4;

    default:
      return 1.5;
  }
};
