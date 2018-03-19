import keyBy from 'lodash/keyBy';

export const keyById = (collection, property) =>
  keyBy(collection, item => item[property]);
