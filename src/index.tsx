import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Core from './pages/core';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { initStore } from './store';

const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
});

darkTheme.typography.h6 = {
    [darkTheme.breakpoints.up('sm')]: {
        fontSize: '1rem'
    },
    [darkTheme.breakpoints.up('md')]: {
        fontSize: '1.3rem'
    },
    [darkTheme.breakpoints.up('lg')]: {
        fontSize: '1.5rem'
    }
};

darkTheme.typography.h5 = {
    fontSize: '1rem',
    '@media (min-width: 500px)': {
        fontSize: '1rem'
    },
    '@media (min-width: 900px)': {
        fontSize: '1.3rem'
    },
    '@media (min-width: 1325px)': {
        fontSize: '1.5rem'
    }
};

const store = initStore({});

createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Core />
            </ThemeProvider>
        </BrowserRouter>
    </Provider>
);
