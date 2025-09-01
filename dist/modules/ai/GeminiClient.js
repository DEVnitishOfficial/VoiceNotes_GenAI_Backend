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
exports.GeminiClient = void 0;
const genai_1 = require("@google/genai");
const config_1 = require("../../config");
const app_error_1 = require("../../utils/errors/app.error");
const fs_1 = __importDefault(require("fs"));
class GeminiClient {
    constructor() {
        if (!config_1.serverConfig.GEMINI_API_KEY) {
            throw new app_error_1.internalServerError("GEMINI_API_KEY is not set in .env");
        }
        this.ai = new genai_1.GoogleGenAI({ apiKey: config_1.serverConfig.GEMINI_API_KEY });
        this.audioModel = config_1.serverConfig.GEMINI_AUDIO_MODEL;
        this.summaryModel = config_1.serverConfig.GEMINI_SUMMARY_MODEL;
    }
    transcribeFile(filePath, mimeType) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("calling from GeminiClient");
            // read file into buffer
            const fileBuffer = fs_1.default.readFileSync(filePath);
            // encode as base64
            const base64Audio = fileBuffer.toString("base64");
            const resp = yield this.ai.models.generateContent({
                model: this.audioModel,
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                inlineData: {
                                    mimeType,
                                    data: base64Audio,
                                },
                            },
                            { text: "Transcribe this audio and return only text." },
                        ],
                    },
                ],
            });
            const text = (resp === null || resp === void 0 ? void 0 : resp.text) || (resp === null || resp === void 0 ? void 0 : resp.outputText);
            if (!text)
                throw new app_error_1.internalServerError("Gemini transcription returned empty result");
            return text.trim();
        });
    }
    summarizeText(text_1) {
        return __awaiter(this, arguments, void 0, function* (text, maxSentences = 3) {
            const prompt = `Summarize the following note in ${maxSentences} short sentences:\n\n${text}`;
            const resp = yield this.ai.models.generateContent({
                model: this.summaryModel,
                contents: [prompt],
            });
            const summary = (resp === null || resp === void 0 ? void 0 : resp.text) || (resp === null || resp === void 0 ? void 0 : resp.outputText);
            if (!summary)
                throw new app_error_1.internalServerError("Gemini summarization returned empty result");
            return summary.trim();
        });
    }
}
exports.GeminiClient = GeminiClient;
