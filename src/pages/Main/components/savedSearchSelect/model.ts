import {createEvent, restore} from "effector";

export type savedSearch = {
  id: string;
  name: string;
  url: string;
};

export const setSavedSearch = createEvent<savedSearch>();

export const $savedSearch = restore<savedSearch>(setSavedSearch, null);
