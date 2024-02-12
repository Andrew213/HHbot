import { AppConfig } from 'cfg';

const config: AppConfig = {
    static: {
        // тут можно указать ссылку на s3 хранилище
        baseUrl: '/static/'
    }
};

module.exports = config;
