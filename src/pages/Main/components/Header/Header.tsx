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

interface HeaderI {
    message: string;
    setMessage: (a: string) => void;
    setAutoResponseStart: (a: (prev: boolean) => boolean) => void;
    autoResponseStart: boolean;
    count: number;
    breakpoint_md: number;
    breakpoint_sm: number;
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
            sx={{
                marginBottom: 2,
                height: width <= props.breakpoint_sm ? '50px' : 'auto'
            }}
        >
            <Toolbar sx={{ padding: 1 }}>
                {width > props.breakpoint_md ? (
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

                {width > props.breakpoint_md &&
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

                {width < props.breakpoint_md && <MobileBar {...props} />}

                <Button
                    onClick={async () => {
                        await logout();
                        navigate('/login');
                    }}
                    color="inherit"
                    variant="outlined"
                    size={width <= props.breakpoint_md ? 'small' : 'medium'}
                    sx={{ ml: 'auto' }}
                >
                    Выйти
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;