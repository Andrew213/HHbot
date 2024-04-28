import {
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
    IconButton,
    Snackbar,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import HelpOutlineSharpIcon from '@mui/icons-material/HelpOutlineSharp';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { api } from '@/api';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useSearchParams } from 'react-router-dom';

const ScheduleModal: React.FC<
    Omit<DialogProps, 'children'> & {
        setAreResponsesScheduled: (a: boolean) => void;
    }
> = props => {
    const [open, setIsOpen] = useState(false);
    const [time, setTime] = useState<dayjs.Dayjs | null>(dayjs());

    const [count, setCount] = useState<string>('1');

    const [message, setMessage] = useState<string>('');

    const [search, setSearch] = useState<string>();

    const [resume_id, setResumeId] = useState<string>('');

    const [disabled, setDisabled] = useState<boolean>(false);

    const [notificationOpen, setNotificationOpen] = useState<boolean>(false);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.has('resume')) {
            setResumeId(searchParams.get('resume') as string);
        }
    }, [searchParams]);

    useEffect(() => {
        setIsOpen(props.open);
    }, [props.open]);

    useEffect(() => {
        props.setAreResponsesScheduled(disabled);
    }, [disabled]);

    useEffect(() => {
        const getScheduledResponse = async () => {
            const { data } = await api.get(`/api/schedule/${resume_id}`);
            if (data.data) {
                const { count, hours, minutes, message } = data.data;
                setTime(dayjs().set('hour', hours).set('minute', minutes));
                setCount(count);
                setMessage(message);
                setDisabled(true);
            }
        };
        if (resume_id) {
            getScheduledResponse();
        }
    }, [resume_id]);

    const { user } = useTypedSelector(state => state.User);

    const onChageCount = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = e.target.value;
        if (+value > 50) {
            return;
        }
        const regEx = new RegExp('[0-9]');
        if (regEx.test(value) || !value) {
            setCount(value);
        }
    };

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await api.post(`/api/schedule`, {
            hours: dayjs(time).format('HH'),
            minutes: dayjs(time).format('mm'),
            count,
            message,
            search,
            resume_id,
            email: user.email
        });

        if (response.status === 200) {
            setDisabled(true);
            setNotificationOpen(true);
        }
    };

    const handleOnCancel = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await api.delete(`/api/schedule/${resume_id}`);
        if (response.status === 200) {
            setDisabled(false);
            setNotificationOpen(true);
        }
    };

    return (
        <>
            <Snackbar
                open={notificationOpen}
                autoHideDuration={2000}
                onClose={() => setNotificationOpen(false)}
            >
                <Alert
                    variant="filled"
                    sx={{ color: '#fff' }}
                    severity="success"
                >
                    {!disabled ? 'Рассылка прекращена' : 'Рассылка запущена'}
                </Alert>
            </Snackbar>
            <Dialog
                PaperProps={{
                    component: 'form',
                    onSubmit: disabled ? handleOnCancel : handleOnSubmit
                }}
                scroll="body"
                sx={{
                    '& .MuiBackdrop-root': {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)'
                    }
                }}
                {...props}
                open={open}
            >
                <DialogTitle
                    sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <div>Запланировать автоотклики</div>

                    <IconButton
                        sx={{
                            marginLeft: 'auto',
                            right: 0
                        }}
                        onClick={e => {
                            setIsOpen(false);
                            if (props.onClose) {
                                props.onClose(e, 'escapeKeyDown');
                            }
                        }}
                        size="large"
                    >
                        <CloseIcon color="error" fontSize="inherit" />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    <Typography>
                        Автоматизируйте отправку откликов на вакансии, выбрав
                        время, количество откликов и добавив сопроводительное
                        письмо. Функция автооткликов отправит ваши заявки
                        ежедневно в выбранное вами время.
                    </Typography>
                </DialogContent>
                {disabled && <Alert severity="success">Рассылка активна</Alert>}
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column' }}
                >
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="ru"
                    >
                        <TimePicker
                            disabled={disabled}
                            label="Время отправки откликов"
                            value={time}
                            onChange={setTime}
                            slotProps={{
                                textField: {
                                    required: true,
                                    margin: 'normal',
                                    fullWidth: true
                                }
                            }}
                        />
                    </LocalizationProvider>
                    <TextField
                        type="number"
                        disabled={disabled}
                        onChange={onChageCount}
                        autoFocus
                        fullWidth
                        required
                        value={count}
                        margin="normal"
                        label="Количество откликов (1-50)"
                    />

                    <TextField
                        autoFocus
                        fullWidth
                        disabled={disabled}
                        multiline
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        margin="normal"
                        label="Сопроводительное"
                    />
                    <TextField
                        autoFocus
                        fullWidth
                        disabled={disabled}
                        margin="normal"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        label="Ключевые слова"
                        InputProps={{
                            endAdornment: (
                                <Tooltip
                                    title="
Без этой строки отклики будут отправляться на наиболее подходящие вакансии к резюме. Как на главной странице.
В это поле можно вставить поисковый запрос и тогда запланированные отклики будут отправлять на найденные по этой строке вакансии.
"
                                >
                                    <IconButton>
                                        <HelpOutlineSharpIcon />
                                    </IconButton>
                                </Tooltip>
                            )
                        }}
                    />
                    <DialogActions>
                        <LoadingButton
                            type="submit"
                            size="small"
                            variant="contained"
                            autoFocus
                            sx={{
                                color: '#fff'
                            }}
                            color={disabled ? 'error' : 'success'}
                        >
                            {disabled ? 'Закончить рассылку' : 'Запланировать'}
                        </LoadingButton>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ScheduleModal;
