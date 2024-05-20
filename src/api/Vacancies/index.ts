import {VacnciesStateT} from "@/pages/Main/components/VacanciesList/model";

import {api, errorHandler} from "../api";

export type vacancy = {
  id: string;
  name: string;
  salary: {
    currency: string;
    from: number | null;
    gross: boolean; // Признак что границы зарплаты указаны до вычета налогов
    to: number | null;
  };
  employer: {
    name: string;
    alternate_url: string;
    logo_urls?: {
      "90": string;
    };
  };
  has_test: boolean; // Информация о наличии прикрепленного тестового задании к вакансии
  response_letter_required: boolean; // Обязательно ли заполнять сообщение при отклике на вакансию
  experience: {
    // Требуемый опыт работы из справочника experience
    id: string;
    name: string;
  };
  snippet: {
    // (Дополнительные текстовые отрывки)
    requirement: string | null; // Отрывок из требований по вакансии, если они найдены в тексте описания
    responsibility: string | null; // Отрывок из обязанностей по вакансии, если они найдены в тексте описания
  };

  area: {
    name: string;
  };

  alternate_url: string;
};

export const getSimilarVacancies = async ({
  resume_id,
  page,
}: {
  resume_id: string;
  page: number;
}) => {
  try {
    const response = await api.get<VacnciesStateT>(
      `/api/vacancies?resume_id=${resume_id}&page=${page}`,
    );
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

export const searchVacancies = async ({
  text,
  page,
}: {
  text: string;
  page: number;
}) => {
  try {
    const response = await api.get<VacnciesStateT>(
      `/api/vacancies/search?text=${text}&page=${page}`,
    );
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

export const sendNegotiation = async ({
  data,
  id,
}: {
  data: {
    vacancy_id?: string;
    resume_id?: string;
    message?: string; // знак вопроса делает это свойство необязательным
  };
  id: string;
}) => {
  try {
    await api.post("/api/vacancies/negotiations", data);
    return id;
  } catch (error) {
    errorHandler(error);
  }
};
