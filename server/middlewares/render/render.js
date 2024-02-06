"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (req, res, next) {
    console.log('AAAAAAA HY 2I');
    res.renderBundle = function (bundleName, data) {
        console.log('AAAAAAA HYI');
        // const location = req.url;
        // renderBundle({ bundleName, data, location });
    };
    next();
});
