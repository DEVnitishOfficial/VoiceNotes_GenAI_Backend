"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachCorrelationIdMiddleware = void 0;
const uuid_1 = require("uuid");
const request_helpers_1 = require("../utils/helpers/request.helpers");
const attachCorrelationIdMiddleware = (req, res, next) => {
    // generating a unique correlation Id.
    const correlationId = (0, uuid_1.v4)();
    req.headers['x-correlation-id'] = correlationId;
    request_helpers_1.asyncLocalStorage.run({ correlationId: correlationId }, () => {
        next();
    });
};
exports.attachCorrelationIdMiddleware = attachCorrelationIdMiddleware;
