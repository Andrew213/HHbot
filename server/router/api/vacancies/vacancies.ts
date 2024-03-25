import { api } from '..';

class VacanciesAPI {
    /**
        При указании параметров пагинации (page, per_page) работает ограничение: 
        глубина возвращаемых результатов не может быть больше 2000. 
        Например, возможен запрос per_page=10&page=199 (выдача с 1991 по 2000 вакансию), но запрос с per_page=10&page=200 вернёт ошибку (выдача с 2001 по 2010 вакансию)
     */
    public async getSimilarVacancies(resume_id: string, page: number = 0) {
        try {
            const response = await api.getData(
                `resumes/${resume_id}/similar_vacancies?page=${page}`
            );
            // остановился тут. делаю вывод вакансий
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    // отправить отклик
    public async sendNegotiations(data) {
        try {
            const response = await api.postData('negotiationss', data);
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
}

const vacanciesApiServer = new VacanciesAPI();

export { vacanciesApiServer };
