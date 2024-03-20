import { applyMiddleware, createStore } from 'redux';
import { RootState, reducers } from './RootReducers';
import { thunk } from 'redux-thunk';

export function initStore(initialState?: unknown) {
    return createStore(reducers, initialState, applyMiddleware(thunk));
}
