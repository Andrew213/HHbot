import {
    Alert,
    Button,
    Grid,
    Snackbar,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import Header from './components/Header/Header';
import VacanciesList from './components/VacanciesList/VacanciesList';
import { useCallback, useEffect, useState } from 'react';
import useWindowSize from '@/hooks/useWondowResize';

import useAction from '@/hooks/useAction';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ProvideSearchContext } from './components/Search/SearchContext';
import Search from './components/Search/Search';
import { api } from '@/api';
import { ROUTES } from '@/routes';
import axios from 'axios';
import DateTimePicker from '@/components/DateTimePicker/DateTimePicker';

const breakpoint_md = 900;
const breakpoint_sm = 500;

const Main = () => {
    const navigate = useNavigate();

    const [message, setMessage] = useState<string>('');

    const [autoResponseStart, setAutoResponseStart] = useState<boolean>(false);

    const { addToResponseArray } = useAction();

    const [resume_id, setResumeId] = useState<string>('');

    const [searchParams] = useSearchParams();

    const [errMsg, setErrMsg] = useState<string>('');

    const { items, responseIds } = useTypedSelector(state => state.Vacancies);

    const { isAuth } = useTypedSelector(state => state.Login);

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        if (isAuth && !searchParams.has('resume')) {
            navigate(ROUTES.SELECT_RESUME.INDEX);
        }
    }, [isAuth, searchParams]);

    useEffect(() => {
        if (searchParams.has('resume')) {
            setResumeId(searchParams.get('resume') as string);
        }
    }, [searchParams]);

    const sendAutoResponse = useCallback(
        async (vacancy_id, has_test, response_letter_required) => {
            const el = document.querySelector(`[itemid="${vacancy_id}"]`);
            if (el) {
                const data: {
                    vacancy_id: string;
                    resume_id: string;
                    message?: string;
                } = {
                    vacancy_id,
                    resume_id
                };
                if (message) {
                    data.message = message;
                }

                // скроллить необходимо в любом случае, даже если отклик не будет отправлен т.к требуется тестове
                // для того чтобы в DOM дерево подгрузились остальные вакансии
                el.scrollIntoView();

                // не отправлять автоотклик без письма если требуется в вакансии
                if (
                    !has_test &&
                    ((response_letter_required && message) ||
                        !response_letter_required)
                ) {
                    try {
                        const response = await api.post(
                            `/api/vacancies/negotiations`,
                            data
                        );

                        if (response.status === 201) {
                            addToResponseArray(vacancy_id);
                            setCounter(prev => prev + 1);
                        }
                    } catch (err) {
                        const errData = err.response.data;
                        setErrMsg(errData.description);
                        setAutoResponseStart(false);
                    }
                }
            }
        },
        [resume_id, message]
    );

    useEffect(() => {
        let timeoutId;
        const startAutoResponse = async () => {
            const notRespondedVacancies = items?.filter(
                ({ id }) => !responseIds.has(id)
            );
            for (let i = 0; i < notRespondedVacancies.length; i++) {
                const vacancy = notRespondedVacancies[i];
                await new Promise<void>(resolve => {
                    const timeId = setTimeout(() => {
                        resolve();
                    }, 2000);
                    timeoutId = timeId;
                }).then(() => {
                    sendAutoResponse(
                        vacancy.id,
                        vacancy.has_test,
                        vacancy.response_letter_required
                    );
                });
            }
        };
        if (items && autoResponseStart) {
            startAutoResponse();
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [items, autoResponseStart]);

    const [width, height] = useWindowSize();

    const {
        user: { id }
    } = useTypedSelector(state => state.User);
    const handleAdd = async () => {
        const response = await axios.post(
            'http://localhost:5000/api/schedule',
            {
                userId: id
            }
        );
        console.log(`response `, response);
    };

    return (
        <ProvideSearchContext>
            <Snackbar
                open={!!errMsg}
                autoHideDuration={2000}
                onClose={() => setErrMsg('')}
            >
                <Alert variant="filled" severity="error">
                    {errMsg}
                </Alert>
            </Snackbar>
            <Header
                count={counter}
                breakpoint_sm={breakpoint_sm}
                breakpoint_md={breakpoint_md}
                message={message}
                setMessage={setMessage}
                setAutoResponseStart={setAutoResponseStart}
                autoResponseStart={autoResponseStart}
            />
            <Grid
                container
                spacing={width >= breakpoint_md ? 4 : 2}
                pl={width >= breakpoint_md ? 2 : 1}
                pr={width >= breakpoint_md ? 3 : 1}
            >
                <Grid
                    item
                    xs={width >= breakpoint_md ? 4 : 12}
                    sx={{
                        paddingLeft: '40px',
                        position: 'relative'
                    }}
                >
                    <Search />
                    {width >= breakpoint_md && (
                        <>
                            <Tooltip title="Введите сопроводительное, которое будет отправляться с откликом.">
                                <TextField
                                    label="Сопроводительное письмо (достаточно просто ввести)"
                                    sx={{
                                        width: '100%',
                                        marginTop: 3,
                                        marginBottom: 3
                                    }}
                                    multiline
                                    value={message}
                                    onChange={e => {
                                        setMessage(e.target.value);
                                    }}
                                />
                            </Tooltip>
                            <Button
                                onClick={() => {
                                    setAutoResponseStart(prev => !prev);
                                }}
                                variant="contained"
                                color={autoResponseStart ? 'error' : 'success'}
                                sx={{
                                    width: 200,
                                    whiteSpace: 'nowrap',
                                    color: '#fff'
                                }}
                            >
                                {autoResponseStart
                                    ? 'Стоп'
                                    : 'Запустить автоотклик'}
                            </Button>
                            <Typography
                                variant="subtitle2"
                                component="div"
                            >{`Автооткликов отправлено: ${counter}`}</Typography>
                        </>
                    )}
                </Grid>

                <Grid xs={12} md={8} lg={8} item>
                    <VacanciesList
                        breakpoint_md={breakpoint_md}
                        resume_id={resume_id}
                        message={message}
                        setErrMsg={setErrMsg}
                    />
                </Grid>
            </Grid>
        </ProvideSearchContext>
    );
};

export default Main;
