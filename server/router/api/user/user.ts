import { api } from '..';

class userAPI {
    public async getUser() {
        try {
            const response = await api.getData('me');
            return response;
        } catch (err) {
            throw new Error(err);
        }
    }
}

const userApiServer = new userAPI();

export { userApiServer };
