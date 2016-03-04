import shallowCompare from 'react-addons-shallow-compare';

function shouldComponentUpdate(nextProps, nextState) {
  return shallowCompare(this, nextProps, nextState);
}

export default function pureRenderDecorator(Component) {
  const componentProto = Component.prototype;
  componentProto.shouldComponentUpdate = shouldComponentUpdate;
  return Component;
}
