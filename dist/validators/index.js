"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQueryParams = exports.validateRequestBody = void 0;
const logger_config_1 = __importDefault(require("../config/logger.config"));
const validateRequestBody = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            logger_config_1.default.info("validation the request body log-first");
            yield schema.parseAsync(req.body);
            logger_config_1.default.info('request body is validated succcessfully log-second');
        }
        catch (error) {
            logger_config_1.default.error("request body is invalid");
            res.status(400).json({
                success: false,
                message: "invalid schema",
                error: error
            });
        }
        next();
    });
};
exports.validateRequestBody = validateRequestBody;
const validateQueryParams = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield schema.parseAsync(req.query);
            console.log('Query params is validated succcessfully');
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: "invalid schema",
                error: error
            });
        }
    });
};
exports.validateQueryParams = validateQueryParams;
