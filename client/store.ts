import { routerMiddleware } from 'connected-react-router';
import { StoreOptions } from 'core';
import { createBrowserHistory, createMemoryHistory } from 'history';

import {
    Middleware,
    createStore,
    combineReducers,
    compose,
    applyMiddleware
} from 'redux';
import { thunk } from 'redux-thunk';
import { createLogger } from 'redux-logger';

import config from 'client/config/config';
import isServer from 'client/utils/serverSide/isServerEnvChecker';
import router from 'server/router';

function configureStore(
    reducers = {},
    initialState = {},
    options?: StoreOptions
) {
    const { isLogger, router } = options || ({} as StoreOptions);

    const history = !isServer
        ? createBrowserHistory()
        : createMemoryHistory({
              initialEntries: router?.initialEntries || ['/']
          });

    const middlewares: Middleware[] = [thunk, routerMiddleware(history)];

    if (!isServer && process.env.NODE_ENV !== config.__PROD__ && isLogger) {
        const logger = createLogger({ collapsed: true });
        middlewares.push(logger);
    }

    const store = createStore(
        combineReducers(reducers),
        initialState,
        compose(applyMiddleware(...middlewares))
    );

    store.dispatch({ type: '@@redux/INIT' } as never);

    // Можем добавить hot-reload

    return { store, history };
}

export default configureStore;
