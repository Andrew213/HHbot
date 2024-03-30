import { Route, Routes, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { ROUTES } from './routes';
import Main from './pages/Main/Main';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useEffect, useState } from 'react';
import Login from './pages/Login/Login';
import useAction from './hooks/useAction';
import { Box, LinearProgress } from '@mui/material';
import SelectResume from './pages/Main/components/SelectResume/SelectResume';
import axios from 'axios';

const AppRouter = () => {
    const navigate = useNavigate();
    const { loading } = useTypedSelector(state => state.Login);

    const [searchParams] = useSearchParams();

    const { checkAuth } = useAction();

    // const [checkAuth, setCheckAuth] = useState(false);

    useEffect(() => {
        const getAuth = async () => {
            const isAuth = await checkAuth();

            if (!isAuth && !searchParams.has('code')) {
                navigate('/login');
            }

            console.log(`getAuth `, isAuth);

            if (!!isAuth && !searchParams.has('resume')) {
                navigate('/resumes');
            }
        };

        getAuth();
    }, []);

    if (loading) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        );
    }

    return (
        <Routes>
            <Route path={ROUTES.INDEX_REDIRECT.INDEX} element={<Main />} />
            <Route path={ROUTES.LOGIN.INDEX} element={<Login />} />
            <Route
                path={ROUTES.SELECT_RESUME.INDEX}
                element={<SelectResume />}
            />
        </Routes>
    );
};

export default AppRouter;
