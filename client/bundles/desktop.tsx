import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Helmet } from 'react-helmet';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

import store, { history } from 'client/utils/infrastructure/store';
import Core from 'client/pages/core';

const Bundle = props => {
    return (
        <>
            <Helmet>
                <html lang="en" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
                />
            </Helmet>
            <Core {...props.data} />
        </>
    );
};

export const DesktopBundle = hot(Bundle);

export default data => {
    hydrateRoot(
        document.getElementById('root') as HTMLElement,
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <DesktopBundle data={data} />
            </ConnectedRouter>
        </Provider>
    );
};
