import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import {useUnit} from "effector-react";
import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

import useWindowSize from "@/hooks/useWondowResize";
import {$login, logoutFx} from "@/pages/Login/model";

import {$user, getUserFx} from "../../model";
import MobileBar from "../MobileBar/MobileBar";
import MobileMenu from "../MobileMenu/MobileMenu";
import ScheduleModal from "../ScheduleModal/ScheduleModal";
import {$resumes, getResumesFx} from "../SelectResume/model";

interface HeaderI {
  message: string;
  setMessage: (a: string) => void;
  setAutoResponseStart: (a: (prev: boolean) => boolean) => void;
  autoResponseStart: boolean;
  count: number;
  breakpoint_md: number;
  breakpoint_sm: number;
}

const Header: React.FC<HeaderI> = props => {
  const navigate = useNavigate();

  const [{isAuth}, user, loading, logout, resumeList, getResumes] = useUnit([
    $login,
    $user,
    getUserFx.pending,
    logoutFx,
    $resumes,
    getResumesFx,
  ]);
  useEffect(() => {
    if (isAuth) {
      getResumes();
    }
  }, [isAuth]);

  const [width] = useWindowSize();

  const [searchParams] = useSearchParams();

  const [resumeId, setResumeId] = useState("");

  const [scheduleOpen, setScheduleOpen] = useState<boolean>(false);

  const [areResponsesScheduled, setAreResponsesScheduled] =
    useState<boolean>(false);

  useEffect(() => {
    if (searchParams.has("resume")) {
      setResumeId(searchParams.get("resume") as string);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <Box sx={{width: "100%"}}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    user && (
      <AppBar
        position="static"
        sx={{
          marginBottom: 2,
          height: width <= props.breakpoint_sm ? "50px" : "auto",
        }}>
        <Toolbar sx={{padding: 1}}>
          {width > props.breakpoint_md ? (
            <Box display="flex">
              <Typography variant="h6" component="div" sx={{mr: 0.5}}>
                {user?.first_name}
              </Typography>
              <Typography variant="h6" component="div" sx={{mr: 2}}>
                {user?.last_name}
              </Typography>
            </Box>
          ) : (
            <MobileMenu
              message={props.message}
              setMessage={props.setMessage}
              resume_id={resumeId}
            />
          )}
          <div>
            {width > props.breakpoint_md &&
              resumeList &&
              resumeList
                .filter(el => el.id === resumeId)
                .map(el => {
                  return (
                    <Button
                      variant="outlined"
                      key={el.id}
                      href={el.alternate_url}
                      target="_blank"
                      size="small">
                      {el.title}
                    </Button>
                  );
                })}
            <Tooltip title="Запланировать автоотклики">
              <IconButton
                size="large"
                onClick={() => {
                  setScheduleOpen(true);
                }}
                sx={{marginLeft: 2}}>
                <CalendarMonthIcon
                  fontSize="inherit"
                  color={areResponsesScheduled ? "success" : "primary"}
                />
              </IconButton>
            </Tooltip>
            <ScheduleModal
              setAreResponsesScheduled={setAreResponsesScheduled}
              onClose={(_event, reason) => {
                if (reason && reason === "backdropClick") return;
                setScheduleOpen(false);
              }}
              open={scheduleOpen}
            />
          </div>

          {width < props.breakpoint_md && <MobileBar {...props} />}

          <Button
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={async () => {
              await logout();
              navigate("/login");
            }}
            color="inherit"
            variant="outlined"
            size={width <= props.breakpoint_md ? "small" : "medium"}
            sx={{ml: "auto"}}>
            Выйти
          </Button>
        </Toolbar>
      </AppBar>
    )
  );
};

export default Header;
