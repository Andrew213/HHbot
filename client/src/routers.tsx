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

const AppRouter = () => {
    const navigate = useNavigate();
    const { loading } = useTypedSelector(state => state.Login);

    const [searchParams, setSearchParams] = useSearchParams();

    const { checkAuth, getTokens } = useAction();

    const [isAuth, setIsAuth] = useState<boolean | null>(null);

    useEffect(() => {
        const getAuth = async () => {
            const isAuth1 = await checkAuth();
            setIsAuth(!!isAuth1);
        };

        if (!searchParams.has('code')) {
            getAuth();
        }
    }, [searchParams]);

    useEffect(() => {
        if (isAuth !== null && !isAuth) {
            navigate(ROUTES.LOGIN.INDEX);
        }
    }, [isAuth]);

    useEffect(() => {
        const exchangeToken = async () => {
            await getTokens(searchParams.get('code') as string);
            setSearchParams('');
        };
        if (searchParams.has('code')) {
            exchangeToken();
        }
    }, [searchParams]);

    if (loading) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        );
    }

    return (
        <Routes>
            {isAuth && (
                <Route path={ROUTES.INDEX_REDIRECT.INDEX} element={<Main />} />
            )}

            <Route path={ROUTES.LOGIN.INDEX} element={<Login />} />
            <Route
                path={ROUTES.SELECT_RESUME.INDEX}
                element={<SelectResume />}
            />
        </Routes>
    );
};

export default AppRouter;
