import { id } from './createMock';

export const entities = {
  fetchSelfEntity: id,
  createRelatedAttributes: id,
  fetchOrganisations: id,
  fetchPersons: id,
  fetchEntity: id,
};

export const relations = {
  fetchRelationsByOrganisation: id,
};

export const attributes = {
  updateAttribute: id,
};

export const user = {
  setSelfEntity: id,
  fetchCurrentUser: id,
};

export const app = {
  initializeApis: id,
  setAppBarDepth: id,
  shuffleQuestions: id,
};

export const graphConstants = {
  fetchGraphConstants: id,
};

export const theme = {
  setUserTheme: id,
};
