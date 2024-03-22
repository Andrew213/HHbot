import {
    Paper,
    CircularProgress,
    styled,
    Grid,
    Stack,
    Typography,
    Button,
    Box,
    Link
} from '@mui/material';
import useAction from 'client/hooks/useAction';
import { useTypedSelector } from 'client/hooks/useTypedSelector';
import { useEffect } from 'react';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import { vacancy } from 'client/store/Vacancies/VacanciesStore';
import { Image } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(5),
    border: '10px solid',
    borderImageSlice: 1,
    borderWidth: 1,
    borderImageSource: 'linear-gradient(to left, #e01cd5, #1CB5E0)',
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
    width: 150
    // backgroundImage: 'linear-gradient(to left, #e01cd5, #1CB5E0)'
    // color: theme.palette.text.primary
}));

const ButtonStyled2 = styled(Button)(({ theme }) => ({
    width: 150,
    color: '#e01cd5',
    borderColor: '#e01cd5',
    '&:hover': {
        borderColor: '#eb14df',
        color: '#eb14df'
    }
})) as any;

const showCurrency = (salary: vacancy['salary']) => {
    if (salary) {
        const { from, to, currency } = salary;
        if (from && to) {
            return (
                <>
                    {`${from} - ${to}`}
                    {currency === 'RUR' && <CurrencyRubleIcon />}
                </>
            );
        }

        return (
            <>
                {`${from || to}`}
                {currency === 'RUR' && <CurrencyRubleIcon />}
            </>
        );
    }

    return 'з/п не указана';
};

const VacanciesList = () => {
    const { user } = useTypedSelector(state => state.User);
    const { loading, items } = useTypedSelector(state => state.Vacancies);

    const { getVacancies } = useAction();

    useEffect(() => {
        if (user.resumeList) {
            getVacancies(user.resumeList[0].id);
        }
    }, [user.resumeList]);

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
                <svg width={0} height={0}>
                    <defs>
                        <linearGradient
                            id="my_gradient"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor="#e01cd5" />
                            <stop offset="100%" stopColor="#1CB5E0" />
                        </linearGradient>
                    </defs>
                </svg>
                <CircularProgress
                    size={120}
                    sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
                />
            </Grid>
        );
    }

    return (
        <Stack
            spacing={5}
            sx={{
                overflow: 'auto',
                maxHeight: 'calc(100vh - 80px)',
                paddingRight: '24px'
            }}
        >
            {items?.map(el => {
                const { id, name, salary, snippet, alternate_url, employer } =
                    el;
                return (
                    <Item variant="outlined" key={id}>
                        <Grid display="flex" flexDirection="column" gap={5}>
                            <Box component="div" textAlign="start">
                                <Box
                                    component="div"
                                    display="flex"
                                    justifyContent="space-between"
                                >
                                    <Typography fontWeight={700} variant="h5">
                                        {name}
                                    </Typography>

                                    <ButtonStyled2
                                        href={alternate_url}
                                        variant="outlined"
                                        target="_blank"
                                    >
                                        Открыть на HH
                                    </ButtonStyled2>
                                </Box>

                                <Typography
                                    color="white"
                                    variant={salary ? 'h4' : 'subtitle1'}
                                    mb={1}
                                >
                                    {showCurrency(salary)}
                                </Typography>
                                <Link
                                    href={employer.alternate_url}
                                    target="_blank"
                                >
                                    {employer?.name}
                                </Link>
                            </Box>
                            {snippet && (
                                <Box
                                    component="div"
                                    alignSelf="baseline"
                                    textAlign="start"
                                    maxWidth={800}
                                >
                                    <Typography mb={2}>
                                        {snippet.responsibility}
                                    </Typography>

                                    <Typography>
                                        {snippet.requirement}
                                    </Typography>
                                </Box>
                            )}

                            <ButtonStyled variant="contained">
                                Откликнуться
                            </ButtonStyled>
                        </Grid>
                    </Item>
                );
            })}
        </Stack>
    );
};

export default VacanciesList;
