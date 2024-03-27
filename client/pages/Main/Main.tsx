import {
    Button,
    Grid,
    SpeedDial,
    SpeedDialAction,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import Header from './components/Header/Header';
import VacanciesList from './components/VacanciesList/VacanciesList';
import { useCallback, useEffect, useState } from 'react';
import useWindowSize from 'client/hooks/useWondowResize';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import MessageIcon from '@mui/icons-material/Message';
import useAction from 'client/hooks/useAction';
import { useTypedSelector } from 'client/hooks/useTypedSelector';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { ProvideSearchContext } from './components/Search/SearchContext';
import Search from './components/Search/Search';

const actions = [
    { icon: <PlayCircleIcon color="success" />, name: 'Start' },
    { icon: <StopCircleIcon color="error" />, name: 'Stop' },
    { icon: <MessageIcon />, name: 'Message' }
];

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

    const someAsyncFunc = useCallback(
        async vacancy_id => {
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
                const response = await axios.post('/negotiations', data);

                el.scrollIntoView();

                if (response.status === 201) {
                    addToResponseArray(vacancy_id);
                    setCounter(prev => prev + 1);
                }
            }
        },
        [resume_id, message]
    );

    useEffect(() => {
        let timeoutIds: ReturnType<typeof setTimeout>[] = [];
        const startAutoResponse = async () => {
            const notRespondedVacancies = items?.filter(
                ({ id }) => !responseIds.has(id)
            );

            for (let i = 0; i < notRespondedVacancies.length; i++) {
                const vacancy = notRespondedVacancies[i];
                await new Promise<void>(resolve => {
                    const id = setTimeout(() => {
                        resolve();
                    }, 1000);
                    timeoutIds.push(id);
                }).then(() => {
                    someAsyncFunc(vacancy.id);
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
                message={message}
                setMessage={setMessage}
                setAutoResponseStart={setAutoResponseStart}
                autoResponseStart={autoResponseStart}
            />
            <Grid container spacing={4} paddingLeft={'40px'}>
                {width >= 900 ? (
                    <Grid
                        item
                        xs={4}
                        sx={{
                            paddingLeft: '40px',
                            position: 'relative'
                        }}
                    >
                        <Search />

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
                    </Grid>
                ) : (
                    <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        sx={{ position: 'fixed', bottom: 16, right: 34 }}
                        icon={<SpeedDialIcon />}
                    >
                        {actions.map(action => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                            />
                        ))}
                    </SpeedDial>
                )}

                <Grid xs={12} md={8} lg={8} item>
                    <VacanciesList
                        search_value={''}
                        resume_id={resume_id}
                        message={message}
                    />
                </Grid>
            </Grid>
        </ProvideSearchContext>
    );
};

export default Main;
