// ОСНОВНОЙ ФАЙЛ, ОТКУДА ЭЕКСПОРТИРУЕТСЯ МЕТОД renderBundle и прочие
// ТУТ И ПРОИСХОДИТ ПОДМЕНА HTML НА СЕРВЕРЕ
import cfg from '../../../lib/cfg';

const getBundle = (bundleName: string, lang: string) => {
    const module = `../../../ssr.bundles.${lang}`;

    if (cfg?.render?.isHot) {
        /**
         * Удаление кэша модуля в данном коде выполняется, чтобы обеспечить актуальность и свежесть загружаемого модуля.
         * Кэширование модулей - это механизм, который позволяет JavaScript-движку сохранять загруженные модули в памяти для повторного использования.
         *
         * Когда модуль загружается в первый раз, он кэшируется, и при последующих запросах к нему, JavaScript-движок использует кэшированную версию модуля,
         * вместо повторной загрузки с диска или сети.
         * Это может повысить производительность и быстродействие приложения.
         *
         * Однако, в случае, когда приложение находится в режиме разработки или используется горячая перезагрузка (hot reloading),
         * необходимо обновлять модули при каждом изменении кода, чтобы разработчик видел изменения в режиме реального времени без перезапуска приложения.
         * В этом случае, удаление кэша модуля позволяет достичь этой цели.
         */
        delete require.cache[require.resolve(module)];
    }

    return require(module).bundles[bundleName];
};

export interface RenderBundleArguments {
    bundleName: string;
    data: {};
    location: string;
}

export default ({ bundleName, data }: RenderBundleArguments) => {
    // тут можно прокидывать язык из data
    const Bundle = getBundle(bundleName, 'ru');

    console.log(`Bundle `, Bundle);
};
