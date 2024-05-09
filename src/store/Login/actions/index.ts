/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {ThunkDispatch} from "redux-thunk";

import {api} from "../../../api";
import {LoginStateT} from "../LoginState";
import {errorToken, logoutToken, receiveToken, requestToken} from "./AC";
import {LoginActionI} from "./AI";
import {LoginActionType} from "./AT";

export const checkAuth = () => {
  return async (dispatch: ThunkDispatch<LoginStateT, void, LoginActionI>) => {
    try {
      dispatch({
        type: LoginActionType.REQUEST_TOKEN,
        loading: true,
      });
      const response = await api.get("/api/session/check");

      dispatch({
        type: LoginActionType.CHECK_AUTH,
        isAuth: response.data,
      });
      return response.data;
    } catch (err) {
      dispatch({
        type: LoginActionType.FETCH_LOGIN_ERROR,
        errMsg: err,
      });
    }
  };
};

export const getTokens = (authCode: string) => {
  return async (dispatch: ThunkDispatch<LoginStateT, void, LoginActionI>) => {
    try {
      dispatch(requestToken());
      const response = await api.post("/api/session/token", {
        code: authCode,
      });

      if (response.status === 200) {
        dispatch(receiveToken());
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      dispatch(errorToken(error));
      console.log("error in LOGIN TOKEN store", error);
    }
  };
};

export const logout = () => {
  return async (dispatch: ThunkDispatch<LoginStateT, void, LoginActionI>) => {
    try {
      const response = await api.delete("/api/session/logout");

      if (response.status === 204) {
        dispatch(logoutToken());
      }
    } catch (error) {
      console.log("error in store logout", error);
    }
  };
};
