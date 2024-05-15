import {Button, Grid, Typography} from "@mui/material";
import {useUnit} from "effector-react";
import {useEffect} from "react";
import {createSearchParams, useNavigate} from "react-router-dom";

import Spiner from "@/components/Spinner/Spiner";
import {$login} from "@/pages/Login/model";

import {$resumes, getResumesFx} from "./model";

const SelectResume: React.FC = () => {
  const [{isAuth}, resumeList, getResumes, loading] = useUnit([
    $login,
    $resumes,
    getResumesFx,
    getResumesFx.pending,
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      getResumes();
    }
  }, [isAuth]);

  if (loading) {
    return (
      <Grid
        alignContent="center"
        alignItems="center"
        display="flex"
        justifyContent="center"
        sx={{
          height: "calc(100vh - 80px)",
        }}>
        <Spiner />
      </Grid>
    );
  }

  return (
    <Grid
      alignContent="center"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      display="flex"
      height="100vh"
      gap={5}>
      <Typography variant="h5">Выберите резюме</Typography>

      {resumeList?.length &&
        resumeList.map(({id, title}) => (
          <Button
            onClick={() => {
              navigate({
                pathname: "/",
                search: createSearchParams({
                  resume: id,
                }).toString(),
              });
            }}
            variant="outlined"
            key={id}>
            {title}
          </Button>
        ))}
    </Grid>
  );
};

export default SelectResume;
