import {createEffect, createEvent, createStore, sample} from "effector";

import {
  getSimilarVacancies,
  searchVacancies,
  sendNegotiation,
  vacancy,
} from "@/api/Vacancies";

import {savedSearch} from "../savedSearchSelect/model";

export type VacnciesStateT = {
  items: vacancy[];
  loading: boolean;
  page: number;
  pages: number;
  per_page: number;
  alternate_url: string | null;
  errMsg?: string;
  found: number;
  responseIds: Set<string>;
  savedSearch?: savedSearch;
};

export const $vacancies = createStore<VacnciesStateT>({
  responseIds: new Set(),
} as VacnciesStateT);

export const negotiationSent = createEvent();

export const getVacanciesFx = createEffect(getSimilarVacancies);
export const searchVacanciesFx = createEffect(searchVacancies);
export const sendNegotiationFx = createEffect(sendNegotiation);

const concatVacancies = (
  store: VacnciesStateT,
  clk: VacnciesStateT | undefined,
) => {
  if (store.items && clk!.page > 0) {
    const oldVacancies = store.items;
    const items = [...oldVacancies, ...clk!.items];
    return {...store, items} as VacnciesStateT;
  }
  return {...store, ...clk} as VacnciesStateT;
};

sample({
  clock: getVacanciesFx.doneData,
  source: $vacancies,
  target: $vacancies,
  fn(store, clk) {
    return concatVacancies(store, clk);
  },
});

sample({
  clock: searchVacanciesFx.doneData,
  source: $vacancies,
  target: $vacancies,
  fn(store, clk) {
    return concatVacancies(store, clk);
  },
});

sample({
  clock: sendNegotiationFx.doneData,
  source: $vacancies,
  target: $vacancies,
  fn(src, clk) {
    const copy = new Set(src.responseIds);
    copy.add(clk!);
    return {...src, responseIds: copy};
  },
});
