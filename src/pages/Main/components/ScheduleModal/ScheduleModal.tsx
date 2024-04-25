import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
    IconButton,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { ButtonStyled2 } from '../VacancyItem/VacancyItem';
import HelpOutlineSharpIcon from '@mui/icons-material/HelpOutlineSharp';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';

const ScheduleModal: React.FC<Omit<DialogProps, 'children'>> = props => {
    const [open, setIsOpen] = useState(false);

    const [time, setTime] = useState<dayjs.Dayjs | null>(dayjs());

    const [count, setCount] = useState<string>('1');

    const [message, setMessage] = useState<string>('');

    const [search, setSearch] = useState<string>();

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

    useEffect(() => {
        setIsOpen(props.open);
    }, [props.open]);

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            time: dayjs(time).format('HH:mm'),
            count,
            message,
            search
        };

        console.log(`data `, data);
    };

    return (
        <Dialog
            PaperProps={{
                component: 'form',
                onSubmit: handleOnSubmit
            }}
            scroll="body"
            sx={{
                //You can copy the code below in your themes
                // '& .MuiPaper-root': {
                //     background: '#000'
                // },
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
                    Автоматизируйте отправку откликов на вакансии, выбрав время,
                    количество откликов и добавив сопроводительное письмо.
                    Функция автооткликов отправит ваши заявки ежедневно в
                    выбранное вами время.
                </Typography>
            </DialogContent>

            <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="ru"
                >
                    <TimePicker
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
                    multiline
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    margin="normal"
                    label="Сопроводительное"
                />
                <TextField
                    autoFocus
                    fullWidth
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
                    >
                        Запланировать
                    </LoadingButton>
                    <ButtonStyled2
                        variant="outlined"
                        size="small"
                        type="submit"
                    >
                        Отменить
                    </ButtonStyled2>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export default ScheduleModal;
