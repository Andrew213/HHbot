import { api } from '..';

class userAPI {
    public async getUser() {
        try {
            const response = await api.getData('me');
            return response;
        } catch (err) {
            throw err;
        }
    }

    public async getResumeList() {
        try {
            const response = await api.getData('resumes/mine');
            return response;
        } catch (err) {
            throw err;
        }
    }
}

const userApiServer = new userAPI();

export { userApiServer };
