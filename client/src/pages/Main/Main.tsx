import { Button, Grid, TextField, Tooltip, Typography } from '@mui/material';
import Header from './components/Header/Header';
import VacanciesList from './components/VacanciesList/VacanciesList';
import { useCallback, useEffect, useState } from 'react';
import useWindowSize from '@/hooks/useWondowResize';

import useAction from '@/hooks/useAction';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useSearchParams } from 'react-router-dom';
// import axios from 'axios';
import { ProvideSearchContext } from './components/Search/SearchContext';
import Search from './components/Search/Search';
import { api } from '@/api';

const firstBr = 900;

const Main = () => {
    const [message, setMessage] = useState<string>('');

    const [autoResponseStart, setAutoResponseStart] = useState<boolean>(false);

    const { addToResponseArray } = useAction();

    const [resume_id, setResumeId] = useState<string>('');

    const [searchParams] = useSearchParams();

    const { items, responseIds } = useTypedSelector(state => state.Vacancies);

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        if (searchParams.has('resume')) {
            setResumeId(searchParams.get('resume') as string);
        }
    }, [searchParams]);

    const sendAutoResponse = useCallback(
        async (vacancy_id, has_test) => {
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
                // для того чтобы в DOM дерево подгрузились отальныевакансии
                el.scrollIntoView();

                if (!has_test) {
                    const response = await api.post(
                        `${
                            import.meta.env.VITE_CLIENT_HOST
                        }/api/vacancies/negotiations`,
                        data
                    );
                    if (response.status === 201) {
                        addToResponseArray(vacancy_id);
                        setCounter(prev => prev + 1);
                    }
                }
            }
        },
        [resume_id, message]
    );

    useEffect(() => {
        let timeoutIds: ReturnType<typeof setTimeout>[] = [];
        const startAutoResponse = async () => {
            const notRespondedVacancies = items?.filter(
                ({ id, has_test }) => !responseIds.has(id)
            );

            for (let i = 0; i < notRespondedVacancies.length; i++) {
                const vacancy = notRespondedVacancies[i];
                await new Promise<void>(resolve => {
                    const id = setTimeout(() => {
                        resolve();
                    }, 2000);
                    timeoutIds.push(id);
                }).then(() => {
                    sendAutoResponse(vacancy.id, vacancy.has_test);
                });
            }
        };
        if (items && autoResponseStart) {
            startAutoResponse();
        }

        return () => {
            timeoutIds.forEach(id => clearTimeout(id));
        };
    }, [items, autoResponseStart]);

    const [width] = useWindowSize();

    return (
        <ProvideSearchContext>
            <Header
                count={counter}
                message={message}
                setMessage={setMessage}
                setAutoResponseStart={setAutoResponseStart}
                autoResponseStart={autoResponseStart}
            />
            <Grid
                container
                spacing={width >= firstBr ? 4 : 2}
                paddingLeft={'40px'}
            >
                <Grid
                    item
                    xs={width >= firstBr ? 4 : 12}
                    sx={{
                        paddingLeft: '40px',
                        position: 'relative'
                    }}
                    paddingRight={width >= firstBr ? 'inherit' : '40px'}
                >
                    <Search />
                    {width >= firstBr && (
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
                        firstBr={firstBr}
                        resume_id={resume_id}
                        message={message}
                    />
                </Grid>
            </Grid>
        </ProvideSearchContext>
    );
};

export default Main;
