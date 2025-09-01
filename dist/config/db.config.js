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
exports.connectToDB = void 0;
const _1 = require(".");
const logger_config_1 = __importDefault(require("./logger.config"));
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbUrl = _1.serverConfig.DB_URL;
        const conn = yield mongoose_1.default.connect(dbUrl);
        console.log(`MongoDB Connected successfully on : ${conn.connection.host}`);
        mongoose_1.default.connection.on("error", (error) => {
            logger_config_1.default.info("Mongodb connection error", error);
        });
        mongoose_1.default.connection.on("disconnected", () => {
            logger_config_1.default.warn("MongoDB disconnected");
        });
        process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
            yield mongoose_1.default.connection.close();
            logger_config_1.default.info("Mongodb connection closed");
            process.exit(0); // success exit
        }));
    }
    catch (error) {
        logger_config_1.default.error("Failed to connect to mongodb", error);
        process.exit(1); // failure exit
    }
});
exports.connectToDB = connectToDB;
