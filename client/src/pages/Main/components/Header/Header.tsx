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
import { useTypedSelector } from '@/hooks/useTypedSelector';
import useAction from '@/hooks/useAction';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useWindowSize from '@/hooks/useWondowResize';
import MobileBar from '../MobileBar/MobileBar';
import MobileMenu from '../MobileMenu/MobileMenu';

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5)
}));

interface HeaderI {
    message: string;
    setMessage: (a: string) => void;
    setAutoResponseStart: (a: (prev: boolean) => boolean) => void;
    autoResponseStart: boolean;
    count: number;
}

const Header: React.FC<HeaderI> = props => {
    const { getUser, logout, getResume } = useAction();

    const navigate = useNavigate();

    const { user, loading } = useTypedSelector(state => state.User);

    const { isAuth } = useTypedSelector(state => state.Login);

    const [width] = useWindowSize();

    const [searchParams] = useSearchParams();

    const [resumeId, setResumeId] = useState('');

    useEffect(() => {
        if (searchParams.has('resume')) {
            setResumeId(searchParams.get('resume') as string);
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
        <AppBar
            position="static"
            sx={{ marginBottom: 2, paddingLeft: 2, paddingRight: 2 }}
        >
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
                    <MobileMenu
                        message={props.message}
                        setMessage={props.setMessage}
                        resume_id={resumeId}
                    />
                )}

                {width > 900 &&
                    user.resumeList &&
                    user.resumeList
                        .filter(el => el.id === resumeId)
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
            </ToolbarStyled>
        </AppBar>
    );
};

export default Header;
