import { Button, Grid } from '@mui/material';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/routes';

const Login = () => {
    const { isAuth, loading } = useTypedSelector(state => state.Login);

    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && isAuth) {
            navigate(ROUTES.SELECT_RESUME.INDEX);
        }
    }, [isAuth, loading]);

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            rowSpacing={0}
            alignItems="center"
            justifyContent="center"
            justifyItems="center"
            style={{ minHeight: '100vh' }}
        >
            <Button
                variant="contained"
                size="large"
                type="button"
                href={`https://hh.ru/oauth/authorize?response_type=code&client_id=${
                    import.meta.env.VITE_CLIENT_ID
                }`}
            >
                Авторизоваться
            </Button>
        </Grid>
    );
};

export default Login;
