import AppBar from '@mui/material/AppBar';

import {
    Box,
    Button,
    LinearProgress,
    Toolbar,
    Typography,
    styled
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTypedSelector } from 'client/hooks/useTypedSelector';
import useAction from 'client/hooks/useAction';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    padding: '0 40px'
    // textAlign: 'center',
    // color: theme.palette.text.secondary
}));
const Header = () => {
    const { getTokens, getUser, logout, getResume } = useAction();

    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    const { user, loading } = useTypedSelector(state => state.User);
    const { isAuth } = useTypedSelector(state => state.Login);

    useEffect(() => {
        if (searchParams.has('code')) {
            getTokens(searchParams.get('code') as string);
            setSearchParams('');
        }
    }, [searchParams]);

    useEffect(() => {
        if (isAuth) {
            getUser();
            getResume();
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
        <AppBar position="static" sx={{ marginBottom: 2, paddingLeft: 0 }}>
            <ToolbarStyled>
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

                {user.resumeList?.length &&
                    user.resumeList.map(el => {
                        return (
                            <Button
                                variant="outlined"
                                key={el.id}
                                href={el.alternate_url}
                                target="_blank"
                            >
                                {el.title}
                            </Button>
                        );
                    })}

                <Button
                    onClick={() => {
                        logout();
                        navigate('/login');
                    }}
                    color="inherit"
                    variant="outlined"
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
            </ToolbarStyled>
        </AppBar>
    );
};

export default Header;
