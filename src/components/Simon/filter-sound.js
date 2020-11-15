// eslint-disable-next-line import/prefer-default-export
export const filterSound = (soundList, value) => {
  const copySoundList = [...soundList.childNodes];

  const currentSound = copySoundList.filter((sound) => sound.getAttribute('data-sound') === value);
  return currentSound[0];
};
