import { hydrateRoot } from 'react-dom/client';
import { Helmet } from 'react-helmet';
import { hot } from 'react-hot-loader/root';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Core from 'client/pages/core';
import { initStore } from 'client/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

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
// @ts-ignore
const store = initStore(window.__PRELOADED_STATE__);

delete window.__PRELOADED_STATE__;

export const DesktopBundle = hot(Bundle);

const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: { backgroundColor: '#1CB5E0' }
            }
        }
    }
});

export default data => {
    hydrateRoot(
        document.getElementById('root') as HTMLElement,
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />
                    <DesktopBundle data={data} />
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    );
};
