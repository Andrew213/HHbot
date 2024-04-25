import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import {
    Box,
    Button,
    Grid,
    Link,
    Paper,
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
import { LoadingButton } from '@mui/lab';

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

const breakpoint_sm = 500;

export const ButtonStyled2 = styled(Button)(() => ({
    color: '#e01cd5',
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
        setErrMsg: (a: string) => void;
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
    setErrMsg,
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
            try {
                const response = await api.post(
                    `${
                        import.meta.env.VITE_CLIENT_HOST
                    }/api/vacancies/negotiations`,
                    data
                );

                if (response.status === 201) {
                    addToResponseArray(id);
                }
            } catch (err) {
                const errData = err.response.data;
                setErrMsg(errData.description);
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
                    <Box
                        component="div"
                        textAlign="start"
                        display="flex"
                        flexDirection="column"
                        gap={1}
                    >
                        <Box
                            component="div"
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Typography
                                fontWeight={700}
                                maxWidth={800}
                                variant="h5"
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
                        >
                            {showCurrency(salary)}
                        </Typography>

                        <Typography>
                            <LocationOnIcon
                                sx={{ marginRight: 0.5 }}
                                fontSize="inherit"
                            />
                            {area.name}
                        </Typography>

                        <Typography variant="caption" component="div">
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
                            maxHeight={width <= breakpoint_sm ? 100 : 'unset'}
                            sx={{
                                overflow: 'auto'
                            }}
                        >
                            <Typography
                                dangerouslySetInnerHTML={{
                                    __html: snippet.responsibility as string
                                }}
                            />

                            <Typography
                                dangerouslySetInnerHTML={{
                                    __html: snippet.requirement as string
                                }}
                            />
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
                                size={
                                    width <= breakpoint_sm ? 'small' : 'medium'
                                }
                            >
                                Требуется пройти тестовое. Открыть на HH
                            </Button>
                        ) : (
                            <LoadingButton
                                variant="contained"
                                loading={respondLoading}
                                disabled={
                                    responseIds.has(id) ||
                                    (!message && response_letter_required)
                                }
                                onClick={() => {
                                    onRespondHandler(id);
                                }}
                                size={
                                    width <= breakpoint_sm ? 'small' : 'medium'
                                }
                                sx={{ minWidth: '127px' }}
                            >
                                Откликнуться
                            </LoadingButton>
                        )}
                        {width <= 1260 && !has_test && (
                            <ButtonStyled2
                                href={alternate_url}
                                variant="outlined"
                                target="_blank"
                                size={
                                    width <= breakpoint_sm ? 'small' : 'medium'
                                }
                                sx={{ minWidth: '127px' }}
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
