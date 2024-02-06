"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryParser = void 0;
var qs_1 = require("qs");
var queryParser = function (query) {
    return (0, qs_1.parse)(query, {
        decoder: function (str) {
            return decodeURIComponent(str);
        }
    });
};
exports.queryParser = queryParser;
