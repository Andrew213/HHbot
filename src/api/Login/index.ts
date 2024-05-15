import {api, errorHandler} from "../api";

export const checkAuth = async () => {
  try {
    const response = await api.get<boolean>("/api/session/check");
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

export const getTokens = async (authCode: string) => {
  try {
    const response = await api.post("/api/session/token", {
      code: authCode,
    });
    if (response.status === 200) {
      return "OK";
    }
  } catch (error: unknown) {
    errorHandler(error);
  }
};

export const logout = async () => {
  try {
    const response = await api.delete("/api/session/logout");
    if (response.status === 204) {
      return true;
    }
    return false;
  } catch (error: unknown) {
    errorHandler(error);
  }
};
