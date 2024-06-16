export const getRandomString = () => {
  return Math.floor(Math.random() * Date.now()).toString();
};
