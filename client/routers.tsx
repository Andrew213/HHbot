import { Route, Routes, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { ROUTES } from './routes';
import Main from './pages/Main/Main';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useEffect } from 'react';
import Login from './pages/Login/Login';
import useAction from './hooks/useAction';
import { Box, LinearProgress } from '@mui/material';

const AppRouter = () => {
    const navigate = useNavigate();
    const { loading } = useTypedSelector(state => state.Login);

    const [searchParams, setSearchParams] = useSearchParams();

    const { isAuth } = useTypedSelector(state => state.Login);

    useEffect(() => {
        if (!isAuth && !searchParams.has('code')) {
            navigate('/login');
        }
    }, [isAuth, searchParams]);

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
        </Routes>
    );
};

export default AppRouter;
