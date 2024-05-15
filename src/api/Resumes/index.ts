import {api, errorHandler} from "../api";

export type resumeT = {
  id: string;
  title: string;
  alternate_url: string;
};

export const getResume = async () => {
  try {
    const response = await api.get<{items: resumeT[]}>("/api/user/resume");
    return response.data.items;
  } catch (error) {
    errorHandler(error);
  }
};
