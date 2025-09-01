"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
function loadEnv() {
    dotenv_1.default.config();
}
loadEnv();
exports.serverConfig = {
    PORT: Number(process.env.PORT) || 3002,
    DB_URL: process.env.DB_URL || "mongodb://localhost:27017/mydatabase",
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
    GEMINI_AUDIO_MODEL: process.env.GEMINI_AUDIO_MODEL || 'gemini-2.5-pro',
    GEMINI_SUMMARY_MODEL: process.env.GEMINI_SUMMARY_MODEL || 'gemini-2.5-pro',
    AI_PROVIDER: process.env.AI_PROVIDER || "gemini"
};
