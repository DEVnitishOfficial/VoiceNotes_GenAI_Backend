"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingHandler = void 0;
const ping_service_1 = require("./ping.service");
const pingHandler = (req, res, next) => {
    try {
        const result = (0, ping_service_1.getPingResponse)();
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.pingHandler = pingHandler;
