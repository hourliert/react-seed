export function findSettingsList(state) {
  const { settings } = state;
  return settings.get('value').reduce((res, s) => ({
    ...res,
    [s.get('id')]: s.get('value'),
  }), {});
}
