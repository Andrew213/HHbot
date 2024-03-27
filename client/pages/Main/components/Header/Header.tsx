import AppBar from '@mui/material/AppBar';

import {
    Box,
    Button,
    IconButton,
    LinearProgress,
    Menu,
    MenuItem,
    TextField,
    Toolbar,
    Typography,
    styled
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTypedSelector } from 'client/hooks/useTypedSelector';
import useAction from 'client/hooks/useAction';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import useWindowSize from 'client/hooks/useWondowResize';
import MobileBar from '../MobileBar/MobileBar';

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    padding: '0 40px'
}));

interface HeaderI {
    message: string;
    setMessage: (a: string) => void;
    setAutoResponseStart: (a: boolean) => void;
    autoResponseStart: boolean;
}

const Header: React.FC<HeaderI> = props => {
    const { getUser, logout, getResume } = useAction();

    const navigate = useNavigate();

    const { user, loading } = useTypedSelector(state => state.User);

    const { isAuth } = useTypedSelector(state => state.Login);

    const [width] = useWindowSize();

    const [searchParams] = useSearchParams();

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();

    const handleOnMenuClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

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
                {width > 900 ? (
                    <Box display="flex">
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ mr: 0.5 }}
                        >
                            {user?.first_name}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                            {user?.last_name}
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <IconButton
                            onClick={handleOnMenuClick}
                            aria-label="menu"
                            id="long-button"
                            aria-haspopup="true"
                            size="large"
                        >
                            <MenuIcon fontSize="inherit" />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={!!anchorEl}
                            onClose={handleCloseMenu}
                            id="long-button"
                        >
                            <MenuItem>
                                <Button>Резюме на HH</Button>
                            </MenuItem>
                            {/* Тут остановился. делаю адаптив меню */}
                            <MenuItem>
                                <TextField
                                    size="small"
                                    label="Сопроводительное"
                                    multiline
                                    placeholder="Просто ввести"
                                />
                            </MenuItem>
                        </Menu>
                    </>
                )}

                {width > 900 &&
                    user.resumeList &&
                    user.resumeList
                        .filter(el => el.id === searchParams.get('resume'))
                        .map(el => {
                            return (
                                <Button
                                    variant="outlined"
                                    key={el.id}
                                    href={el.alternate_url}
                                    target="_blank"
                                    size="small"
                                >
                                    {el.title}
                                </Button>
                            );
                        })}

                {width < 900 && <MobileBar {...props} />}

                <Button
                    onClick={() => {
                        logout();
                        navigate('/login');
                    }}
                    color="inherit"
                    variant="outlined"
                    size={width <= 900 ? 'small' : 'medium'}
                    sx={{ ml: 'auto' }}
                >
                    Выйти
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
