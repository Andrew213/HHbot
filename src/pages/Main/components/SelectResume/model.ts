import {createEffect, restore} from "effector";

import {getResume} from "@/api/Resumes";

export const getResumesFx = createEffect(getResume);

export const $resumes = restore(getResumesFx, []);
