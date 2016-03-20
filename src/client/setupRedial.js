import { match } from 'react-router';
import { trigger } from 'redial';

export default function setupRedial({
  history,
  routes,
  store: { dispatch },
}) {
  history.listen(location => {
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      const { components } = renderProps;

      const locals = {
        dispatch,
      };

      if (!window.INITIAL_STATE) {
        trigger('fetch', components, locals);
      }

      // Fetch deferred, client-only data dependencies:
      trigger('defer', components, locals);
    });
  });
}
