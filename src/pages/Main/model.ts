import {createEffect, restore} from "effector";

import {getUser} from "@/api/User";

export const getUserFx = createEffect(getUser);

export const $user = restore(getUserFx, null);
