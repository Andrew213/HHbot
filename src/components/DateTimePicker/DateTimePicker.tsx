import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ruRU } from '@mui/x-date-pickers/locales';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { MobileDateTimePicker } from '@mui/x-date-pickers';

import 'dayjs/locale/ru';

const DateTimePicker = props => {
    const [value, setValue] = useState<Dayjs | null>();

    useEffect(() => {
        console.log(value?.toDate());
    }, [value]);

    return (
        <LocalizationProvider
            localeText={
                ruRU.components.MuiLocalizationProvider.defaultProps.localeText
            }
            dateAdapter={AdapterDayjs}
            adapterLocale="ru"
        >
            <MobileDateTimePicker
                disablePast
                views={['day', 'hours', 'minutes']}
                displayWeekNumber
                value={value}
                onChange={setValue}
                onAccept={setValue}
                label="Выберите дату и время"
            />
        </LocalizationProvider>
    );
};

export default DateTimePicker;
