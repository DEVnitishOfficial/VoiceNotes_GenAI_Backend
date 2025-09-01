"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericErrorHandler = void 0;
const genericErrorHandler = (err, req, res, next) => {
    console.log('eror from generic error', err);
    res.status(err.statusCode).json({ success: false, message: err.message, stack: err.stack });
};
exports.genericErrorHandler = genericErrorHandler;
