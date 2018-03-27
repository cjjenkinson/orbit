import keys from 'lodash/keys';

/** Entries Selectors */

export const isFetching = (state) => {
  const fetchingStatus = state.entries.isFetching;
  return fetchingStatus;
};

export const getEntriesById = (state) => {
  const { entriesById } = state.entries;
  const entriesByIdArray = keys(entriesById);

  return [entriesById, entriesByIdArray];
};

export const getEntry = (state, id) => {
  const { entriesById } = state.entries;
  const entry = entriesById[id];

  return entry;
};
