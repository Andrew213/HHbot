import { Button, Grid, Typography } from '@mui/material';
import Spiner from '@/components/error-boundry/Spiner';
import useAction from '@/hooks/useAction';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useEffect } from 'react';
import {
    useSearchParams,
    useNavigate,
    createSearchParams
} from 'react-router-dom';

const SelectResume: React.FC = () => {
    const {
        user: { resumeList },
        loading
    } = useTypedSelector(state => state.User);

    const { getTokens, getResume } = useAction();

    const { isAuth } = useTypedSelector(state => state.Login);

    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (searchParams.has('code')) {
            getTokens(searchParams.get('code') as string);
            setSearchParams('');
        }
    }, [searchParams]);

    useEffect(() => {
        if (isAuth) {
            getResume();
        }
    }, [isAuth]);

    if (loading) {
        return (
            <Grid
                alignContent="center"
                alignItems="center"
                display="flex"
                justifyContent="center"
                sx={{
                    height: 'calc(100vh - 80px)'
                }}
            >
                <Spiner />
            </Grid>
        );
    }

    return (
        <Grid
            alignContent="center"
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            display="flex"
            height="100vh"
            gap={5}
        >
            <Typography variant="h5">Выберите резюме</Typography>

            {resumeList &&
                resumeList.map(({ id, title }) => (
                    <Button
                        onClick={() => {
                            navigate({
                                pathname: '/',
                                search: createSearchParams({
                                    resume: id
                                }).toString()
                            });
                        }}
                        variant="outlined"
                        key={id}
                    >
                        {title}
                    </Button>
                ))}
        </Grid>
    );
};

export default SelectResume;
