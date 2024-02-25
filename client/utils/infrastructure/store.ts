import { thunk } from 'redux-thunk';
import configureStore from 'client/store';
import { BaseStore, reducers } from 'client/reducers';

const state = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const { store: reduxStore } = configureStore(reducers, state, {
    isLogger: true
});

export type CommonStore = ReturnType<typeof reduxStore.getState> & BaseStore;

export default reduxStore;
