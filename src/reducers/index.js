import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import errors from './errors';
import loading from './loading';
import app from './app';
import currentUser from './currentUser';
import currentSession from './currentSession';
import menus from './menus';
import theme from './theme';

import settings from './settings';

const rootReducer = combineReducers({
  loading,
  errors,
  app,
  menus,
  theme,
  currentSession,
  currentUser,

  settings,

  form: formReducer,
  routing: routerReducer,
});

export default rootReducer;
