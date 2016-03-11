# React-Seed [![Build Status](https://travis-ci.org/hourliert/react-seed.svg?branch=develop)](https://travis-ci.org/hourliert/react-seed)
React-seed written with React.

## Getting started
```
nvm use
npm install
npm start
```

## Dependencies

### App
- React 0.14+
- Redux (flux micro-framework)
- Immutable (immutable object manager)
- material-ui (material design framework)
- Radium (inline css interpreter)
- fetch (http client)

### Dev
- webpack (module bundler)
- babel (transpiler)

### Testing
- jscs (formatter)
- eslint (linter)
- mocha (unit testing framework)
- jsdom (fake dom for unit-testing)
- chai (assestion framework)
- sinon (spy and mock library)
- enzyme (helpers for testing react components)

## The Project
### Gulp tasks
This project uses npm commands instead of gulp commands to auto resolve the local gulp module. These are just aliases to gulp tasks.

- `npm test`: run the tests
- `npm run build`: build the app. Possible to run `npm run build -- --release` to build the production version
- `npm start`: build and serve the app with hot-reloading
- `npm run lint`: run javascript linters on the code. The linters used are **JSCS** and **eslint**
- `gulp clean`: remove the build folder
- `gulp tdd`: run the tests in watch mode

### Folders
#### Build files
Gulp task definition and webpack configuration.

```
.
├── gulpfile.babel.js
├── package.json
├── tasks
│   ├── bundle.js (call to webpack)
│   ├── clean.js (remove unused folders)
│   ├── copy.js (copy package.json in build folder)
│   ├── jsdom.js (helper used when starting unit test with mocha)
│   ├── lint.js (call to eslint and jscs)
│   ├── serve.js (start browsersync for hot-reloading, proxy request to the front-end server)
│   ├── server.js (start the front-end server)
│   └── test.js
└── webpack.config.js (how to bundle the project)
```

#### Entry files
Project entries point.

```
.
├── package.json
├── src
│   ├── client.js (client entry point)
│   ├── config (various configuration)
│   │   ├── apiServer.js
│   │   ├── auth.js
│   │   ├── frontEndServer.js
│   │   ├── index.js
│   │   └── leftNavMenuItems.js
│   ├── routes.js (application routes)
│   ├── server
│   │   ├── rendering.js (use if SERVER_RENDERING is enable)
│   │   └── static.js
│   ├── server.js (front-end server entry point)
```

#### Abstract, Smart and Dumb Components
React components.
Smart components are in `./src/containers`. These components 'know' the application data. (These data are injected via redux with the @connect decorator).
Dumb components are in `./src/components/`.
These components don't know the application data. All data used are passed via
props from their parent. (Same when using HTML attributes in Polymer).

Component in `./src/decorators/` are abstract. The component `DefaultCard` extends the abstract component `Card`.

Dumb components should be 100% reusable and as much as possible stateless.

```
.
├── package.json
├── src
│   ├── components (Dumb components)
│   │   ├── AccessChecker
│   │   │   ├── AccessChecker.js
│   │   │   ├── __tests__
│   │   │   │   └── AccessChecker-test.js
│   │   │   └── index.js
│   │   ├── App
│   │   │   ├── App.js
│   │   │   ├── __tests__
│   │   │   │   └── App-test.js
│   │   │   └── index.js
│   │   ├── CardsGrid
│   │   │   ├── CardsGrid.js
│   │   │   ├── __tests__
│   │   │   │   └── CardsGrid-test.js
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   ├── DefaultCard
│   │   │   ├── DefaultCard.js
│   │   │   ├── __tests
│   │   │   │   └── DefaultCard-test.js
│   │   │   └── index.js
|   |   |   ...
│   │   ├── LoginForm
│   │   │   ├── LoginForm.js
│   │   │   ├── __tests__
│   │   │   │   └── LoginForm-test.js
│   │   │   ├── index.js
│   │   │   ├── styles.js
│   │   │   └── validationRules.js
│   │   ├── cards.js
│   │   └── index.js
│   ├── containers (Smart components)
│   │   ├── AppPage
│   │   │   ├── AppPage.js
│   │   │   ├── __tests__
│   │   │   │   └── AppPage-test.js
│   │   │   └── index.js
│   │   ├── HomePage
│   │   │   ├── HomePage.js
│   │   │   ├── __tests__
│   │   │   │   └── HomePage-test.js
│   │   │   └── index.js
|   |   |   ...
│   │   └── index.js
│   ├── decorators
│   │   ├── Card
│   │   │   ├── Card.js
│   │   │   ├── __tests__
│   │   │   │   └── Card-test.js
│   │   │   └── index.js
│   │   └── index.js
│   └── themes
│       └── index.js
```

#### Flux (Redux) Implementation
Redux actions creator are in `./src/actions/`.
An action creator is a function that return an action. An action is an object with a type (string, the name of the action) and a payload (object).
The action names are defined in `./src/constants/`.

Each action when dispatch are going through several middlewares defined in `./src/store`. These middleware can execute function depending on the redux action received. They can for instance modify on the fly the incoming action or dispatch another action.
This project use promise middleware. This middleware read the incoming action, test if the payload is a promise. If it's true, it disptaches another action to notice that a promise is pending. Then it waits for the promise resolution and dispatches its result.

When an action reach the end of the middlewares chain, Redux call **all** reducers (define in `./src/reducers/`) with the current application state and the current action as arguments.
A reducer is a function with this simple prototype : (state, action) => state.
By default (if the incoming action doesn't match the reducer actions) it returns the current state. In the other case, it returns a new state. It MUST be a new object with a new reference (and not be deep equal to the previous state). In fact, the state object is **immutable**.

All reducers are composed in `./src/reducers/index.js`. In that way, each reducer only manages a small part of the whole application.

```
.
├── package.json
├── src
│   ├── actions (Action creators)
│   │   ├── __tests__
│   │   │   ├── session-test.js
│   │   │   └── ws-test.js
│   │   ├── app.js
│   │   ├── cards.js
│   │   ├── index.js
│   │   ├── session.js
│   │   └── ws.js
│   ├── api (API functions (login, websocket, etc.))
│   │   ├── index.js
│   │   ├── session
│   │   │   ├── __tests__
│   │   │   │   └── session-test.js
│   │   │   ├── index.js
│   │   │   └── session.js
│   │   └── ws
│   │       ├── WebSocketConnector.js
│   │       ├── __tests__
│   │       │   └── WebSocketConnector-test.js
│   │       └── index.js
│   ├── client.js
│   ├── components
│   │   ├── AccessChecker
│   │   │   ├── AccessChecker.js
│   │   │   ├── __tests__
│   │   │   │   └── AccessChecker-test.js
│   │   │   └── index.js
│   │   ├── App
│   │   │   ├── App.js
│   │   │   ├── __tests__
│   │   │   │   └── App-test.js
│   │   │   └── index.js
│   │   ├── CardsGrid
│   │   │   ├── CardsGrid.js
│   │   │   ├── __tests__
│   │   │   │   └── CardsGrid-test.js
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   ├── DefaultCard
│   │   │   ├── DefaultCard.js
│   │   │   ├── __tests
│   │   │   │   └── DefaultCard-test.js
│   │   │   └── index.js
|   |   |   ...
│   │   ├── LoginForm
│   │   │   ├── LoginForm.js
│   │   │   ├── __tests__
│   │   │   │   └── LoginForm-test.js
│   │   │   ├── index.js
│   │   │   ├── styles.js
│   │   │   └── validationRules.js
│   │   ├── cards.js
│   │   └── index.js
│   ├── config
│   │   ├── apiServer.js
│   │   ├── auth.js
│   │   ├── frontEndServer.js
│   │   ├── index.js
│   │   └── leftNavMenuItems.js
│   ├── constants (contains Actions Names)
│   │   ├── access.js
│   │   ├── app-actions.js
│   │   ├── cards-actions.js
│   │   ├── index.js
│   │   ├── session-actions.js
│   │   └── ws-actions.js
│   ├── containers
│   │   ├── AppPage
│   │   │   ├── AppPage.js
│   │   │   ├── __tests__
│   │   │   │   └── AppPage-test.js
│   │   │   └── index.js
│   │   ├── HomePage
│   │   │   ├── HomePage.js
│   │   │   ├── __tests__
│   │   │   │   └── HomePage-test.js
│   │   │   └── index.js
|   |   |   ...
│   │   └── index.js
│   ├── decorators
│   │   ├── Card
│   │   │   ├── Card.js
│   │   │   ├── __tests__
│   │   │   │   └── Card-test.js
│   │   │   └── index.js
│   │   └── index.js
│   ├── helpers (several utility functions)
│   │   ├── api
│   │   │   ├── HttpError.js
│   │   │   ├── __tests__
│   │   │   │   └── checkHttpStatus-test.js
│   │   │   ├── checkHttpStatus.js
│   │   │   └── index.js
│   │   ├── auth
│   │   │   ├── __tests__
│   │   │   │   └── auth-test.js
│   │   │   ├── auth.js
│   │   │   └── index.js
│   │   ├── components
│   │   │   ├── Html
│   │   │   │   ├── Html.js
│   │   │   │   ├── __tests__
│   │   │   │   │   └── Html-test.js
│   │   │   │   ├── index.js
│   │   │   │   └── styles.js
│   │   │   └── index.js
│   │   ├── immutable
│   │   │   ├── __tests__
│   │   │   │   └── immutable-test.js
│   │   │   ├── index.js
│   │   │   └── serverToClient.js
│   │   ├── index.js
│   │   └── test
│   │       ├── context-stub.js
│   │       └── index.js
│   ├── reducers (state mutators)
│   │   ├── __tests__
│   │   │   ├── app-test.js
│   │   │   ├── cards-test.js
│   │   │   ├── session-test.js
│   │   │   └── ws-test.js
│   │   ├── app.js
│   │   ├── cards.js
│   │   ├── index.js
│   │   ├── session.js
│   │   └── ws.js
│   ├── routes.js
│   ├── server
│   │   ├── rendering.js
│   │   └── static.js
│   ├── server.js
│   ├── store (define redux store instance and instantiate middlewares)
│   │   ├── authMiddleware.js
│   │   ├── configureStore.js
│   │   ├── index.js
│   │   └── undefinedMiddleware.js
│   └── themes
|       └── index.js
└─
```
