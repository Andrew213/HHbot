import vendorsManifest from 'dist/webpack/vendors-manifest.json';

const files = Object.keys(vendorsManifest.content);

// подключаю библиотеки реакта на сервере (см. server/middlewares/render/bundle.tsx)

export default {
    name: vendorsManifest.name,
    hasJs: files.findIndex(file => file.endsWith('.js')) > -1,
    hasCss: files.findIndex(file => file.endsWith('.css')) > -1
};
