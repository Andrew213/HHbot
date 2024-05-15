import {Button, Grid} from "@mui/material";

const Login = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      rowSpacing={0}
      alignItems="center"
      justifyContent="center"
      justifyItems="center"
      style={{minHeight: "100vh"}}>
      <Button
        variant="contained"
        size="large"
        type="button"
        href={`https://hh.ru/oauth/authorize?response_type=code&client_id=${
          import.meta.env.VITE_CLIENT_ID
        }`}>
        Авторизоваться
      </Button>
    </Grid>
  );
};

export default Login;
