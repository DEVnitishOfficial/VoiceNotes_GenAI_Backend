// src/modules/ai/GeminiAIService.ts
import { FileStorageService } from "./FileStorageService";
import { GeminiClient } from "./GeminiClient";
import { IAIService } from "./IAIService";

export class GeminiAIService implements IAIService {
  private geminiClient: GeminiClient;

  constructor(geminiClient: GeminiClient) {
    this.geminiClient = geminiClient;
  }

  async transcribe(filePath: string, mimeType = "audio/wav"): Promise<string> {
    console.log("calling from GeminiAIService");
    try {
      return await this.geminiClient.transcribeFile(filePath, mimeType);
    } finally {
      FileStorageService.deleteFile(filePath);
    }
  }

  async summarize(text: string, maxSentences = 3): Promise<string> {
    return this.geminiClient.summarizeText(text, maxSentences);
  }
}
