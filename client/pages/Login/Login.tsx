import { Button, Grid } from '@mui/material';
import { useTypedSelector } from 'client/hooks/useTypedSelector';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Login = () => {
    const { isAuth } = useTypedSelector(state => state.Login);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    }, [isAuth]);

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
                href={`https://hh.ru/oauth/authorize?response_type=code&client_id=${process.env.CLIENT_ID}`}
            >
                Авторизоваться
            </Button>
        </Grid>
    );
};

export default Login;
