import { api } from '..';

class VacanciesAPI {
    public async getSimilarVacancies(resume_id: string) {
        try {
            const response = await api.getData(
                `resumes/${resume_id}/similar_vacancies`
            );
            // остановился тут. делаю вывод вакансий
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
}

const vacanciesApiServer = new VacanciesAPI();

export { vacanciesApiServer };
