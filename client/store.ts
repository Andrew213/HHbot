import { StoreOptions } from 'core';
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

function configureStore(
    reducers = {},
    initialState = {},
    options?: StoreOptions
) {
    const { isLogger } = options || ({} as StoreOptions);

    const middlewares: Middleware[] = [thunk];

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

    return { store };
}

export default configureStore;
