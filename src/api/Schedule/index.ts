import {savedSearch} from "@/store/Vacancies/VacanciesStore";

import {api, errorHandler} from "../api";

export const createSchedule = async data => {
  try {
    await api.post("/api/schedule", data);
    return true;
  } catch (error) {
    errorHandler(error);
  }
};

type scheduleT = {
  count: number;
  hours: number;
  minutes: number;
  message: string;
  resume_id: string;
  email: string;
  savedSearch?: savedSearch;
};

export const getSchedule = async (resume_id: string) => {
  try {
    const {data} = await api.get<{data: scheduleT}>(
      `/api/schedule/${resume_id}`,
    );
    return data.data;
  } catch (error) {
    errorHandler(error);
  }
};

export const deleteSchedulte = async (resume_id: string) => {
  try {
    await api.delete(`/api/schedule/${resume_id}`);
    return true;
  } catch (error) {
    errorHandler(error);
  }
};
