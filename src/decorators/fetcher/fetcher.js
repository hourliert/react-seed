import React, { Component } from 'react';
import hoistStatics from 'hoist-non-react-statics';

export default function abstractFetcher(name) {
  return function fetcher(fetchers, nbRunToDo = Infinity) {
    return function wrapWithFetcher(ComposedComponent) {
      class Fetcher extends Component {
        static displayName = `${name}(${
          ComposedComponent.displayName || ComposedComponent.name || 'Component'
        })`;

        render() {
          return <ComposedComponent {...this.props} />;
        }
      }

      Fetcher[name] = {
        fetchers,
        nbRunDone: 0,
        nbRunToDo,
        incrementNumberOfRun() {
          this.nbRunDone++;
        },
      };
      return hoistStatics(Fetcher, ComposedComponent);
    };
  };
}
