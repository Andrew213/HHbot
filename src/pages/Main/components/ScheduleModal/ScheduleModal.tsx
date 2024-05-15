/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import "dayjs/locale/ru";

import CloseIcon from "@mui/icons-material/Close";
import {LoadingButton} from "@mui/lab";
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
  Typography,
} from "@mui/material";
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {useUnit} from "effector-react";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

import {createSchedule, deleteSchedulte, getSchedule} from "@/api/Schedule";

import {$user} from "../../model";
import {$savedSearch, setSavedSearch} from "../savedSearchSelect/model";
import SavedSearchSelect from "../savedSearchSelect/SavedSearchSelect";

const ScheduleModal: React.FC<
  Omit<DialogProps, "children"> & {
    setAreResponsesScheduled: (a: boolean) => void;
  }
> = props => {
  const [time, setTime] = useState<dayjs.Dayjs | null>(dayjs());

  const [savedSearch, user] = useUnit([$savedSearch, $user]);

  const [count, setCount] = useState(1);

  const [message, setMessage] = useState("");

  const [search] = useState();

  const [resume_id, setResumeId] = useState("");

  const [disabled, setDisabled] = useState(false);

  const [notificationOpen, setNotificationOpen] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has("resume")) {
      setResumeId(searchParams.get("resume") as string);
    }
  }, [searchParams]);

  useEffect(() => {
    props.setAreResponsesScheduled(disabled);
  }, [disabled]);

  useEffect(() => {
    const getScheduledResponse = async () => {
      const response = await getSchedule(resume_id);
      if (response) {
        const {count, hours, minutes, message} = response;
        if (response.savedSearch) {
          setSavedSearch(response.savedSearch);
        }
        setTime(dayjs().set("hour", hours).set("minute", minutes));
        setCount(count);
        setMessage(message);
        setDisabled(true);
      }
    };
    if (resume_id) {
      void getScheduledResponse();
    }
  }, [resume_id]);

  const onChageCount = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    if (+value > 50) {
      return;
    }
    const regEx = new RegExp("[0-9]");
    if (regEx.test(value) || !value) {
      setCount(+value);
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isScheduled = await createSchedule({
      hours: dayjs(time).format("HH"),
      minutes: dayjs(time).format("mm"),
      count,
      message,
      search,
      resume_id,
      email: user ? user.email : "",
      savedSearch: savedSearch || undefined,
    });

    if (isScheduled) {
      setDisabled(true);
      setNotificationOpen(true);
    }
  };

  const handleOnCancel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const deleted = await deleteSchedulte(resume_id);
    if (deleted) {
      setDisabled(false);
      setNotificationOpen(true);
    }
  };

  return (
    <>
      <Snackbar
        open={notificationOpen}
        autoHideDuration={2000}
        onClose={() => setNotificationOpen(false)}>
        <Alert variant="filled" sx={{color: "#fff"}} severity="success">
          {!disabled ? "Рассылка прекращена" : "Рассылка запущена"}
        </Alert>
      </Snackbar>
      <Dialog
        PaperProps={{
          component: "form",
          onSubmit: disabled ? handleOnCancel : handleOnSubmit,
        }}
        scroll="body"
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        }}
        {...props}
        open={props.open}>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
          }}>
          <div>Запланировать автоотклики</div>

          <IconButton
            sx={{
              marginLeft: "auto",
              right: 0,
            }}
            onClick={e => {
              if (props.onClose) {
                props.onClose(e, "escapeKeyDown");
              }
            }}
            size="large">
            <CloseIcon color="error" fontSize="inherit" />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Typography>
            Автоматизируйте отправку откликов на вакансии, выбрав время,
            количество откликов и добавив сопроводительное письмо. Функция
            автооткликов отправит ваши заявки ежедневно в выбранное вами время.
          </Typography>
        </DialogContent>
        {disabled && <Alert severity="success">Рассылка активна</Alert>}
        <DialogContent sx={{display: "flex", flexDirection: "column"}}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <TimePicker
              disabled={disabled}
              label="Время отправки откликов"
              value={time}
              onChange={setTime}
              slotProps={{
                textField: {
                  required: true,
                  margin: "normal",
                  fullWidth: true,
                },
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
          <SavedSearchSelect disabled={disabled} defaultValue={savedSearch} />

          <DialogActions>
            <LoadingButton
              type="submit"
              size="small"
              variant="contained"
              autoFocus
              sx={{
                color: "#fff",
              }}
              color={disabled ? "error" : "success"}>
              {disabled ? "Закончить рассылку" : "Запланировать"}
            </LoadingButton>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ScheduleModal;
