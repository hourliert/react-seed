export default function abstractRunFetchers(name) {
  let nbRun = 0;

  return function runFetchers(components, locals) {
    const promises = (Array.isArray(components) ? components : [components])
      .filter(component => !!component)
      .map(component => ({ component, fetcherConfig: component[name] }))
      .filter(({ fetcherConfig }) =>
        fetcherConfig &&
        fetcherConfig.fetchers &&
        fetcherConfig.nbRunToDo > fetcherConfig.nbRunDone
      )
      .map(({ component, fetcherConfig }) => {
        const { fetchers } = fetcherConfig;

        fetcherConfig.incrementNumberOfRun();

        return typeof locals === 'function' ?
        fetchers(locals(component)) :
        fetchers(locals);
      });

    nbRun++;

    return Promise.all(promises);
  };
}
