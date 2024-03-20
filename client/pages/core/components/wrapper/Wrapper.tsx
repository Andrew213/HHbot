import React from 'react';
import { Helmet } from 'react-helmet';

import { Box, Grid } from '@mui/material';
import AppRouter from 'client/routers';
const Wrapper = () => {
    return (
        <>
            <Helmet>
                <title>Hellos</title>
                <meta name="title" content="ssr" />
            </Helmet>

            <AppRouter />
        </>
    );
};
export default Wrapper;
