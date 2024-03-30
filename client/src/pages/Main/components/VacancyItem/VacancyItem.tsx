import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import {
    Box,
    Button,
    Grid,
    Link,
    Paper,
    CircularProgress,
    Typography,
    styled,
    Alert,
    Chip,
    Stack
} from '@mui/material';
// import axios from 'axios';
import useAction from '@/hooks/useAction';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import useWindowSize from '@/hooks/useWondowResize';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { vacancy } from '@/store/Vacancies/VacanciesStore';
import { memo, useEffect, useRef, useState } from 'react';
import { api } from '@/api';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(5),
    border: '10px solid',
    borderImageSlice: 1,
    borderWidth: 1,
    borderImageSource: 'linear-gradient(to left, #e01cd5, #1CB5E0)',
    textAlign: 'center',
    // height: 560,
    color: theme.palette.text.secondary
}));

const ButtonStyled = styled(Button)(() => ({
    width: 150,
    marginTop: 'auto'
}));

const ButtonStyled2 = styled(Button)(() => ({
    color: '#e01cd5',
    height: 36,
    borderColor: '#e01cd5',
    '&:hover': {
        borderColor: '#eb14df',
        color: '#eb14df'
    },
    marginLeft: 20,
    whiteSpace: 'nowrap',
    '@media (max-width: 1260px)': {
        height: 'auto'
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

const VacancyItem: React.FC<
    vacancy & {
        message: string;
        resume_id: string;
        setSize: (a: number, b: any) => void;
        index: number;
    }
> = ({
    name,
    salary,
    snippet,
    id,
    alternate_url,
    employer,
    area,
    experience,
    message,
    resume_id,
    setSize,
    index,
    has_test,
    response_letter_required
}) => {
    const {
        user: { resumeList }
    } = useTypedSelector(state => state.User);

    const { responseIds } = useTypedSelector(state => state.Vacancies);

    const [respondLoading, setRespondLoading] = useState<boolean>(false);

    const { addToResponseArray } = useAction();

    const [width] = useWindowSize();

    const onRespondHandler = async (vacancy_id: string) => {
        if (resumeList) {
            setRespondLoading(true);
            const data: {
                vacancy_id: string;
                resume_id: string;
                message?: string; // знак вопроса делает это свойство необязательным
            } = {
                vacancy_id,
                resume_id
            };
            if (message) {
                data.message = message;
            }

            const response = await api.post(
                `${
                    import.meta.env.VITE_CLIENT_HOST
                }/api/vacancies/negotiations`,
                data
            );

            if (response.status === 201) {
                addToResponseArray(id);
            }

            setRespondLoading(false);
        }
    };

    const itemRef = useRef<any>();

    useEffect(() => {
        setSize(index, itemRef.current.getBoundingClientRect().height);
    }, [setSize, index]);

    return (
        <>
            <Item ref={itemRef} variant="outlined" itemID={id} key={id}>
                <Grid
                    display="flex"
                    height="100%"
                    flexDirection="column"
                    gap={4}
                >
                    <Box component="div" textAlign="start">
                        <Box
                            component="div"
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Typography
                                fontWeight={700}
                                maxWidth={800}
                                variant="h5"
                                mb={2}
                            >
                                {name}
                            </Typography>
                            {(has_test || response_letter_required) && (
                                <Stack ml={10} gap={2} alignItems="center">
                                    {has_test && (
                                        <Chip
                                            color="error"
                                            size="small"
                                            label="Тестовое"
                                        />
                                    )}
                                    {response_letter_required && (
                                        <Chip
                                            size="small"
                                            color="error"
                                            label="Cопроводительное"
                                        />
                                    )}
                                </Stack>
                            )}
                            {width > 1260 && !has_test && (
                                <ButtonStyled2
                                    href={alternate_url}
                                    variant="outlined"
                                    target="_blank"
                                >
                                    Открыть на HH
                                </ButtonStyled2>
                            )}
                        </Box>

                        <Typography
                            color="white"
                            variant={salary ? 'h4' : 'subtitle1'}
                            mb={1}
                        >
                            {showCurrency(salary)}
                        </Typography>

                        <Typography mb={2}>
                            <LocationOnIcon
                                sx={{ marginRight: 0.5 }}
                                fontSize="inherit"
                            />
                            {area.name}
                        </Typography>

                        <Typography variant="caption" component="div" mb={2}>
                            {experience.name}
                        </Typography>

                        <Link href={employer.alternate_url} target="_blank">
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

                            <Typography>{snippet.requirement}</Typography>
                        </Box>
                    )}

                    {responseIds.has(id) && (
                        <Alert severity="info">Резюме было доставлено</Alert>
                    )}
                    <Box
                        mt="auto"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        {has_test ? (
                            <Button
                                href={alternate_url}
                                variant="contained"
                                target="_blank"
                            >
                                Требуется пройти тестовое. Открыть на HH
                            </Button>
                        ) : (
                            <ButtonStyled
                                onClick={() => {
                                    onRespondHandler(id);
                                }}
                                disabled={
                                    responseIds.has(id) ||
                                    (!message && response_letter_required)
                                }
                                variant="contained"
                            >
                                {respondLoading ? (
                                    <CircularProgress
                                        size={24}
                                        sx={{ color: '#e01cd5' }}
                                    />
                                ) : (
                                    'Откликнуться'
                                )}
                            </ButtonStyled>
                        )}
                        {width <= 1260 && !has_test && (
                            <ButtonStyled2
                                href={alternate_url}
                                variant="outlined"
                                target="_blank"
                            >
                                Открыть на HH
                            </ButtonStyled2>
                        )}
                    </Box>
                </Grid>
            </Item>
        </>
    );
};

export default memo(VacancyItem);
