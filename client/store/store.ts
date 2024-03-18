import { applyMiddleware, createStore } from 'redux';
import { RootState, reducers } from './RootReducers';
import { thunk } from 'redux-thunk';

export function initStore(initialState?: RootState) {
    return createStore(reducers, initialState, applyMiddleware(thunk));
}
