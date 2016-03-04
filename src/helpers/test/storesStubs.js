import Immutable from 'immutable';

export const currentUser = Immutable.fromJS({
  value: {
    _id: 'user/0',
    _rev: '55781764180',
    _key: '0',
    entityId: 'entities/0',
  },
});

export const entitiesWithoutAttribute = Immutable.fromJS({
  value: {
    'entities/0': {
      _id: 'entities/0',
      _rev: '55781764180',
      _key: '0',
      type: 'entityTypes/10',
    },
  },
});

export const entitiesWithAttributes = Immutable.fromJS({
  value: {
    'entities/0': {
      _id: 'entities/0',
      _rev: '55781764180',
      _key: '0',
      type: 'entityTypes/10',
      relatedIds: ['attributes/0', 'attributes/1'],
    },
  },
});

export const noAttribute = Immutable.fromJS({
  value: {},
});

export const attributesLinkedToEntity = Immutable.fromJS({
  value: {
    'attributes/0': {
      _id: 'attributes/0',
      _rev: '55781764180',
      _key: '0',
      attrKey: 'attributeKeys/701',
      entityId: 'entities/0',
    },
    'attributes/1': {
      _id: 'attributes/0',
      _rev: '55781764180',
      _key: '1',
      attrKey: 'attributeKeys/700',
      entityId: 'entities/0',
    },
  },
});

export const attributeKeys = Immutable.fromJS({
  value: {
    'attributeKeys/700': {
      _id: 'attributeKeys/700',
      _rev: '21879324714',
      _key: '700',
      kind: 'X',
      name: 'MINDSET',
      constraint: 'entityTypes/10',
    },
    'attributeKeys/701': {
      _id: 'attributeKeys/701',
      _rev: '21879455786',
      _key: '701',
      kind: 'Y',
      name: 'MINDSET',
      constraint: 'entityTypes/100',
    },
  },
});

export const visualizations = Immutable.fromJS({
  value: {
    'vis/1': {
      id: 'vis/1',
      organisationId: 'entitiyes/1',
      graphLayout: { nodes: {}, links: {} },
    },
  },
});

export const emptyVisualization = Immutable.fromJS({
  value: {},
});
