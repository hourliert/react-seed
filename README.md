# React Seed

This project is a ready to use react seed using Retax.

## Some documentation

Before starting your application, you should take a look at these links. They will help you to have a good overview of the React/Redux environment :

* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)


## Presentation

### What's is in the box ?

* [retax](https://github.com/hourliert/retax)
* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [react-router](https://github.com/reactjs/react-router)
* [react-router-redux](https://github.com/reactjs/react-router-redux)
* [ImmutableJS](https://facebook.github.io/immutable-js/)
* [reselect](https://github.com/reactjs/reselect)
* [redial](https://github.com/markdalgleish/redial)
* [material-ui](http://www.material-ui.com/#/)
* [radium](http://stack.formidable.com/radium/)
* [react-helmet](https://github.com/nfl/react-helmet)
* [redux-form](http://redux-form.com/5.1.0/#/?_k=t21wnx)

### App Features
* Fake api backend to provide basic end-points
* Authentication support (signin / signout)
* Roles and access levels support
* User section (use user as login to access to the user page)
* Admin section (use admin as login to access to the admin page)
* Info page (displays basic session information)
* Error Handling
* Loading Handling
* Different themes for user/admin

### Technical Features
* Server Rendering
* Inline styles with Radium
* Material Design
* Routing support
* Code splitting support
* Immutable and non immutable redux reducers support
* Built-in API Http client using [retax](https://github.com/hourliert/retax) Api module
* Dependency injection (to inject API Http clients into cctions creators and to inject actions creators into components) using [retax](https://github.com/hourliert/retax)

## Getting started

Clone the projet and enter the following commands to install all the dependencies and to launch the project.

```
npm install
npm start
```
This will run the fake api backend and the frontend server.
In development, the app includes **react-hot-reload** allowing edit in real time.

## Seed overview

This boilerplate includes 

## Project structure

* `./src`: Source code
* `./src/actions`: Actions creators
* `./src/api`: Api clients : declare all your backend routes here.
* `./src/components`: Presentationnal components (those don't depend on redux and are very dumb!)
* `./src/config`: App config
* `./src/constants`: App constants (includes Actions names)
* `./src/decorators`: Higher-order components
* `./src/helpers`: Various app helpers (eg. role and access levels checker)
* `./src/reducers`: Redux reducers
* `./src/routes`: Application routes. A route is typically a folder with the following structure:
  * `./index.js`: The **react-router** route object
  * `./container/Container.js`: The container component (this one is aware of redux)
  * `./selector/selectors.js`: Container component specific redux selectors
  * `./component/ContainerWrapper.js`: Wrapper component mediating other components (It should include only components from `./src/components`. ie: presentationnal components)
* `./src/selectors`: Reselect base selectors
* `./src/store`: Middlewares and store enhancers
* `./src/themes`: Theme configuration
* `./src/**/__tests__/`: Test code
* `./src/retax.config.js`: [retax](https://github.com/hourliert/retax) configuration file
* `./src/clientEntry.js`: Client entry
* `./src/serverEntry.js`: (Front-end) Server entry

## Generator

This seed have a Yo Man generator to create all ressources you want.

### Gettings Started

```
npm install -g yo generator-retax
```

### Route

#### Generator

To create the new route 'settings', use the following command :

```
yo retax:route settings
```

The generator will start and ask you additionnal questions :

```
     _-----_
    |       |    .--------------------------.
    |--(o)--|    |  I will scaffold a route |
   `---------´   '--------------------------'
    ( _´U`_ )    
    /___A___\    
     |  ~  |     
   __'.___.'__   
 ´   `  |° ´ Y ` 

```
1. ? What is the url of the route ? /settings
2. ? Should this route be asynchronous ? yes/no
3. ? What is the required access level ? You can choose among public, user or admin. If you have more than thse roles, you can set them later in the index file : `/src/routes/settings/index.js`
4. ? Will this route have child route ? Enter yes if you plan to have child routes like `/settings/infos`.
5. ? Will this route have an IndexRoute ? Enter yes if you want an additional wrapper on your route. Most of the time this won't be necessary, you can choose no.
6. ? Should the components be pure ? Is the page component [pure](https://facebook.github.io/react/docs/pure-render-mixin.html) ? Most of the time, it's the case so choose yes.
7. ? Should the component container include redux ? Do you plan to use [Redux](http://redux.js.org/) for this page ? (access to the store, dispatch actions ... etc)
8. Overwrite files 


You page is almost ready to use ! The generator creates the folder `/src/routes/settings` with everything on it. But if you enter the url `/settings`, you should see a 404 error...
It is normal, there is an additional and final step. 

Locate the parent of your page. In our case, the parents is `/`. If the page had been `/user/settings`, the parent page would have been `/user/`. 
Open the index.js of the parent page (in our case `src/routes/root/index.js`). In the function getChildRoutes, add the following line in the try statement :

```
	const getSettingsRoute = require('routes/settings');
```

and also add an entry in the routes array :

```
	getSettingsRoute(requireAuthFunctions),
```

Your try statement should be similar like this one : 

```
try {
          const getUserRoutes = require('routes/user');
          const getAdminRoutes = require('routes/admin');
          const getSigninRoute = require('routes/signin');
          const getSignoutRoute = require('routes/signout');
          const getSettingsRoute = require('routes/settings');
          const getDefaultRoute = require('routes/default');

          routes = [
            getSigninRoute(requireAuthFunctions),
            getSignoutRoute(requireAuthFunctions),
            getUserRoutes(requireAuthFunctions),
            getAdminRoutes(requireAuthFunctions),
            getSettingsRoute(requireAuthFunctions),
            getDefaultRoute(requireAuthFunctions),
          ];
        }
```

Save all your files and naviguate to your page, you shouldn't see the 404 anymore. You can start to work on the route.
