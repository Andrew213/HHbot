import { createSelector } from 'reselect';

import { CommonStore } from 'client/utils/infrastructure/store';

export const deviceSelector = createSelector(
    [state => state.meta.device],
    device => device
);
