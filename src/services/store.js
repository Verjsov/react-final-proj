import { applyMiddleware, combineReducers, compose as _compose, createStore as _createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import history from "./history";

import { ducks } from "../ducks";
import { appConf } from "../config";

/**
 * Grab all reducers
 */
const reducers = {};
ducks.forEach(duck => {
  reducers[duck.namespace] = duck.reducer;
});

/**
 * Grab all sagas together
 */
//const sagas = ducks.map(d => d.sagas);
const sagas = ducks.filter(d => !!d.sagas).map(d => d.sagas);

/**
 * Creates the store
 * @param history
 * @return {Store}
 */
function createStore({ history }) {
  // make middlewares
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [routerMiddleware(history), sagaMiddleware];
  let compose = _compose;

  // add dev features
  if (!appConf.isProd) {
    middlewares.unshift(
      createLogger({
        collapsed: true,
      }),
    );
    compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _compose; // add redux dev tools
  }

  // create store
  const store = _createStore(
    combineReducers({
      router: connectRouter(history),
      ...reducers,
    }),
    {},
    compose(applyMiddleware(...middlewares)),
  );

  // run sagas
  sagaMiddleware.run(function* () {
    yield all([...sagas.map(s => s())]);
  });

  return store;
}

const store = module.hot?.data?.store || createStore({ history });

// handle hot reloading
if (module.hot) {
  module.hot.dispose((data) => {
    /* eslint no-param-reassign: 0 */
    data.store = store;
  });
}

export default store;
