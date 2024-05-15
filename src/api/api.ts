import axios, {AxiosError} from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_CLIENT_HOST,
});

type error = {
  description: string;
};

const errorHandler = (error: unknown) => {
  const axiosError = error as AxiosError<error>;
  throw axiosError;
};

export {api, errorHandler};
