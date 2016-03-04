import { fromJS } from 'immutable';
import { id } from './createMock';

export function apiThunkCreator(apiName, creator) {
  return creator;
}

export const entities = {
  findSelfEntity(state) {
    return state.entities.get('value').first();
  },

  resolveEntity(state, entity) {
    return entity
      .set('attributes', state.attributes.get('value'));
  },

  findOrganisations(state) {
    return state.entities.get('value');
  },
};

export const attributes = {
  findAttribute(attrs) {
    return attrs.first();
  },

  findEntityAttributes(a) {
    return a;
  },
};

export const attributeKeys = {
  findAttributeKeyId(attrKeys, name, kind) {
    return attrKeys.get('value').findKey(a => (
      a.get('name') === name && a.get('kind') === kind
    ));
  },
};

export const configManager = {

};

export const cookieManager = {
  setAuthCredentials: id,
  removeAuthCredentials: id,
};

export const api = {
  createApiConfig: id,
};

export const visualizations = {
  findDataFromStore() {
    return {
      teams: fromJS({}),
      roleToRoleRelations: fromJS({}),
      userToRoleRelations: fromJS({}),
    };
  },

  computeNodesAndLinks() {
    return {
      nodes: fromJS({}),
      links: fromJS({}),
    };
  },
};

export const settings = {
  findSettingsList() {
    return {
      test: true,
    };
  },
};
