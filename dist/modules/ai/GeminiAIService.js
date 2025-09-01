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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiAIService = void 0;
// src/modules/ai/GeminiAIService.ts
const FileStorageService_1 = require("./FileStorageService");
class GeminiAIService {
    constructor(geminiClient) {
        this.geminiClient = geminiClient;
    }
    transcribe(filePath_1) {
        return __awaiter(this, arguments, void 0, function* (filePath, mimeType = "audio/wav") {
            console.log("calling from GeminiAIService");
            try {
                return yield this.geminiClient.transcribeFile(filePath, mimeType);
            }
            finally {
                FileStorageService_1.FileStorageService.deleteFile(filePath);
            }
        });
    }
    summarize(text_1) {
        return __awaiter(this, arguments, void 0, function* (text, maxSentences = 3) {
            return this.geminiClient.summarizeText(text, maxSentences);
        });
    }
}
exports.GeminiAIService = GeminiAIService;
