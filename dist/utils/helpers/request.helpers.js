"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCorrelationId = exports.asyncLocalStorage = void 0;
const async_hooks_1 = require("async_hooks");
// creating an instance of async local storage.
exports.asyncLocalStorage = new async_hooks_1.AsyncLocalStorage();
const getCorrelationId = () => {
    const asyncStore = exports.asyncLocalStorage.getStore();
    return (asyncStore === null || asyncStore === void 0 ? void 0 : asyncStore.correlationId) || 'Unknown-error-while-creating-correlation-id';
};
exports.getCorrelationId = getCorrelationId;
