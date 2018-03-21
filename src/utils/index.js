import keyBy from 'lodash/keyBy';

export const keyById = (collection, property) => keyBy(collection, item => item[property]);

export const generateRandomId = () => {
  const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const ID_LENGTH = 8;

  let randomId = '';

  for (let i = 0; i < ID_LENGTH; i += 1) {
    randomId += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }

  return randomId;
};

export const createTableDataFromEntities = (entities) => {
  const data = Object.values(entities);
  return data;
};
