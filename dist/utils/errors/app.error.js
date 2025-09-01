"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatortError = exports.ConflictError = exports.UnauthorizedError = exports.NotFoundError = exports.internalServerError = void 0;
class internalServerError {
    constructor(message) {
        this.statusCode = 500;
        this.name = "internalServerError";
        this.message = message;
    }
}
exports.internalServerError = internalServerError;
class NotFoundError {
    constructor(message) {
        this.statusCode = 404;
        this.name = "NotFoundError";
        this.message = message;
        // Capture the stack trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotFoundError);
        }
        else {
            this.stack = new Error().stack;
        }
    }
}
exports.NotFoundError = NotFoundError;
class UnauthorizedError {
    constructor(message) {
        this.statusCode = 401;
        this.name = "UnauthorizedError";
        this.message = message;
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ConflictError {
    constructor(message) {
        this.statusCode = 409;
        this.name = "ConflictError";
        this.message = message;
    }
}
exports.ConflictError = ConflictError;
class ValidatortError {
    constructor(message) {
        this.statusCode = 422;
        this.name = "ValidatorError";
        this.message = message;
    }
}
exports.ValidatortError = ValidatortError;
