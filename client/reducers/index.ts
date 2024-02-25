import { MetaReducers } from './meta';
import { deviceReducer } from './meta/device';

export interface BaseStore {
    meta: MetaReducers;
}

export const reducers = {
    meta: deviceReducer
};
