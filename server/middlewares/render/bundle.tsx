// ОСНОВНОЙ ФАЙЛ, ОТКУДА ЭЕКСПОРТИРУЕТСЯ МЕТОД renderBundle и прочие
// ТУТ И ПРОИСХОДИТ ПОДМЕНА HTML НА СЕРВЕРЕ
import React from 'react';
import cfg from '../../../lib/cfg';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import htmlescape from 'htmlescape';

import vendorsMeta from 'webpack/config/vendors-meta';

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

interface PageHtmlParams {
    bundleName: string;
    bundleHtml: string;
    data: {};
}

const getPageHtml = (params: PageHtmlParams) => {
    const { bundleName, bundleHtml, data } = params;
    const { baseUrl } = cfg.default.static;
    const bundleFilePath = `${baseUrl}${bundleName}.bundle`;

    console.log(`bundleFilePath `, bundleFilePath);
    const vendorsFilePath = `${baseUrl}_/${vendorsMeta.name}`;

    console.log(`vendorsFilePath `, vendorsFilePath);

    const html = renderToStaticMarkup(
        <html>
            <head>
                <link rel="stylesheet" href={`${bundleFilePath}.css`} />
                {vendorsMeta.hasCss && (
                    <link rel="stylesheet" href={`${vendorsFilePath}.css`} />
                )}
            </head>
            <body>
                {/* Вставляю сгенеренный html из клиента */}
                <div
                    id="root"
                    dangerouslySetInnerHTML={{ __html: bundleHtml }}
                />
                <script src={`${bundleFilePath}.ru.js`} />
                {vendorsMeta.hasJs && <script src={`${vendorsFilePath}.js`} />}
                {/* Прокидываю любые данные с сервера на клиент */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `Client.default(${htmlescape(data)});`
                    }}
                />
            </body>
        </html>
    );

    return `<!DOCTYPE html>${html}`;
};

export interface RenderBundleArguments {
    bundleName: string;
    data: {};
    location: string;
}

export default ({ bundleName, data }: RenderBundleArguments) => {
    // тут можно прокидывать язык из data
    const Bundle = getBundle(bundleName, 'ru');

    console.log(`bundleName `, bundleName);

    if (!Bundle) {
        throw new Error(`Bundle ${bundleName} not found`);
    }

    // тут react компонент скомпиленный в html с клиента
    const bundleHtml = renderToString(<Bundle data={data} />);

    return {
        html: getPageHtml({ bundleHtml, bundleName, data })
    };
};
