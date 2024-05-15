import {useUnit} from "effector-react";
import {useEffect} from "react";
import {Route, Routes, useNavigate} from "react-router";
import {useSearchParams} from "react-router-dom";

import Login from "@/pages/Login/Login";
import {$login, checkAuthFx, loginFx} from "@/pages/Login/model";
import SelectResume from "@/pages/Main/components/SelectResume/SelectResume";
import Main from "@/pages/Main/Main";

import {ROUTES} from "./routes";

const AppRouter = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const [{isAuth}, checkAuth, exchangeToken] = useUnit([
    $login,
    checkAuthFx,
    loginFx,
  ]);

  useEffect(() => {
    if (!searchParams.has("code")) {
      checkAuth();
    }
  }, [searchParams]);

  useEffect(() => {
    console.log("isAuth ", isAuth);
    if (isAuth !== null && !isAuth) {
      navigate(ROUTES.LOGIN.INDEX);
    }
    // ОСТАНОВИЛСЯ ТУТ. ДУМАТЬ КАК ПОПРАВИТЬ РЕФРЕШ И РЕДИРЕКТЫ
    if (isAuth && !searchParams.has("resume")) {
      navigate(ROUTES.SELECT_RESUME.INDEX);
    }
  }, [isAuth, searchParams]);

  useEffect(() => {
    if (searchParams.has("code")) {
      exchangeToken(searchParams.get("code") as string);
      setSearchParams("");
    }
  }, [searchParams]);

  return (
    <Routes>
      {isAuth && (
        <Route path={ROUTES.INDEX_REDIRECT.INDEX} element={<Main />} />
      )}

      <Route path={ROUTES.LOGIN.INDEX} element={<Login />} />
      <Route path={ROUTES.SELECT_RESUME.INDEX} element={<SelectResume />} />
    </Routes>
  );
};

export default AppRouter;
