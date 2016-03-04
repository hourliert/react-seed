export function leftNavOpenSelector(state) {
  return state.app.get('leftNavOpen');
}

export function appBarDepthSelector(state) {
  return state.app.get('appBarDepth');
}

export function initialRenderTimeSelector(state) {
  return state.app.get('initialRenderTime');
}
