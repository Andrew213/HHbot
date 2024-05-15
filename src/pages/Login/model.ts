import {createEffect, sample} from "effector";
import {createEvent, createStore} from "effector";

import {checkAuth, getTokens, logout} from "@/api/Login";
import {notificationErrorMessageFx} from "@/utils/notifications";

export type LoginStoreT = {
  isAuth: boolean | null | {params: string; result: string};
  errMsg: string;
  loading: boolean;
};

export const $login = createStore<LoginStoreT>({
  isAuth: null,
  errMsg: "",
  loading: false,
});

export const loginRecieved = createEvent();
export const authRecieved = createEvent<boolean>();
export const logoutRecieved = createEvent<boolean>();

$login.on(loginRecieved, store => ({...store, isAuth: true}));
$login.on(authRecieved, (store, value) => ({...store, isAuth: value}));
$login.on(logoutRecieved, (store, value) => ({...store, isAuth: value}));

export const loginFx = createEffect(getTokens);
export const checkAuthFx = createEffect(checkAuth);
export const logoutFx = createEffect(logout);

sample({
  clock: checkAuthFx.doneData,
  source: $login,
  target: authRecieved,
  fn(_, clk) {
    return clk!;
  },
});

sample({clock: loginFx.failData, target: notificationErrorMessageFx});
sample({
  clock: loginFx.done,
  source: $login,
  target: loginRecieved,
});

sample({
  clock: logoutFx.doneData,
  source: $login,
  target: logoutRecieved,
  fn(_, clk) {
    return clk!;
  },
});
sample({clock: logoutFx.failData, target: notificationErrorMessageFx});
