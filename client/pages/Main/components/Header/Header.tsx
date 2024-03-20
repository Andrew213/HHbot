import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';
import {
    Box,
    Button,
    LinearProgress,
    Toolbar,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTypedSelector } from 'client/hooks/useTypedSelector';
import useAction from 'client/hooks/useAction';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Header = () => {
    const { GetTokens, GetUser, Logout } = useAction();

    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    const { user, loading } = useTypedSelector(state => state.User);
    const { isAuth } = useTypedSelector(state => state.Login);

    useEffect(() => {
        if (searchParams.has('code')) {
            GetTokens(searchParams.get('code') as string);
            setSearchParams('');
        }
    }, [searchParams]);

    useEffect(() => {
        if (isAuth) {
            GetUser();
        }
    }, [isAuth]);

    if (loading) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        );
    }

    return (
        <AppBar position="static">
            <Toolbar>
                {/* <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton> */}
                <Typography variant="h6" component="div" sx={{ mr: 1 }}>
                    {user?.first_name}
                </Typography>
                <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                    {user?.last_name}
                </Typography>

                <Button variant="outlined" href={user?.resumes_url}>
                    {user?.resumes_url}
                </Button>
                <Button
                    onClick={() => {
                        Logout();
                        navigate('/login');
                    }}
                    color="inherit"
                    sx={{ ml: 'auto' }}
                >
                    Logout
                </Button>

                {/* <Menu
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={isMenuOpen}
            ></Menu> */}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
