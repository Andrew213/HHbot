import {Button, Grid, Typography} from "@mui/material";
import {useEffect} from "react";
import {createSearchParams, useNavigate} from "react-router-dom";

import Spiner from "@/components/Spinner/Spiner";
import useAction from "@/hooks/useAction";
import {useTypedSelector} from "@/hooks/useTypedSelector";

const SelectResume: React.FC = () => {
  const {
    user: {resumeList},
    loading,
  } = useTypedSelector(state => state.User);

  const {getResume} = useAction();

  const {isAuth} = useTypedSelector(state => state.Login);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      getResume();
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

      {resumeList &&
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
