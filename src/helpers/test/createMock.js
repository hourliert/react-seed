import React from 'react';

export function id(x) { return x; }

export default function createMock(name) {
  const Component = (props) => <div {...props} />;
  Component.displayName = name;
  return Component;
}
