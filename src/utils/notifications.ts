import {createEffect} from "effector";

export const notificationErrorMessageFx = createEffect((error: Error) => {
  console.log("err", error);
});

export const notificationSuccessMessageFx = createEffect((msg: string) => {
  console.log("msg", msg);
});
