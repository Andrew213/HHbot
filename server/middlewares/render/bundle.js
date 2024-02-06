"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ОСНОВНОЙ ФАЙЛ, ОТКУДА ЭЕКСПОРТИРУЕТСЯ МЕТОД renderBundle и прочие
// ТУТ И ПРОИСХОДИТ ПОДМЕНА HTML НА СЕРВЕРЕ
var cfg_1 = require("../../../lib/cfg");
var getBundle = function (bundleName, lang) {
    var _a;
    var module = "../../../ssr.bundles.".concat(lang);
    if ((_a = cfg_1.default === null || cfg_1.default === void 0 ? void 0 : cfg_1.default.render) === null || _a === void 0 ? void 0 : _a.isHot) {
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
exports.default = (function (_a) {
    var bundleName = _a.bundleName, data = _a.data;
    // тут можно прокидывать язык из data
    var Bundle = getBundle(bundleName, 'ru');
    console.log("Bundle ", Bundle);
});
