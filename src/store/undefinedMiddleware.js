export default function undefinedMiddleware() {
  return next => action => {
    if (!action) return false;
    return next(action);
  };
}
