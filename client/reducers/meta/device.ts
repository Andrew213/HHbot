import { ActionType, createAction, createReducer } from 'typesafe-actions';

export interface DeviceReducer {
    device: Nullable<'mobile' | 'desktop'>;
}

const defaultState: DeviceReducer = {
    device: null
};

export enum DeviceActionType {
    SET_DEVICE = 'SET_DEVICE'
}

interface SET_DEVICE_I {
    type: DeviceActionType.SET_DEVICE;
    device: DeviceReducer['device'];
}

export const deviceReducer = (
    state = defaultState,
    action: SET_DEVICE_I
): typeof defaultState => {
    switch (action.type) {
        case DeviceActionType.SET_DEVICE:
            return { ...state, device: action.device };
        default:
            return state;
    }
};
