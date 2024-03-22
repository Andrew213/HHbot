import { Helmet } from 'react-helmet';

import NoSsr from '@mui/material/NoSsr';
import AppRouter from 'client/routers';
const Wrapper = () => {
    return (
        <>
            <Helmet>
                <title>HHbot</title>
                <meta name="title" content="ssr" />
            </Helmet>
            <NoSsr>
                <AppRouter />
            </NoSsr>
        </>
    );
};
export default Wrapper;
