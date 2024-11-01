import "dayjs/locale/ru";

import {MobileDateTimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {ruRU} from "@mui/x-date-pickers/locales";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {Dayjs} from "dayjs";
import {useEffect, useState} from "react";

const DateTimePicker = () => {
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
      adapterLocale="ru">
      <MobileDateTimePicker
        disablePast
        views={["day", "hours", "minutes"]}
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
