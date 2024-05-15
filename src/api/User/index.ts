import {api, errorHandler} from "../api";
import {resumeT} from "../Resumes";

export type userT = {
  id: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  email?: string;
  resumes_url?: string;
  resumeList?: resumeT[];
  counter?: {
    new_resume_views: number;
    unread_negotiations: number;
    resumes_count: number;
  };
};

export const getUser = async () => {
  try {
    const response = await api.get<userT>("/api/user/me");
    return response.data;
  } catch (error) {
    console.log("error in user store", error);
  }
};

export const getResumes = async () => {
  try {
    const response = await api.get<{items?: resumeT[]}>("/api/user/resume");

    return response.data.items;
  } catch (error) {
    errorHandler(error);
  }
};
