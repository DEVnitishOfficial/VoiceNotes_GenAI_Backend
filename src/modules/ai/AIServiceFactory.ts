// src/modules/ai/AIServiceFactory.ts
import { IAIService } from "./IAIService";
import { GeminiClient } from "./GeminiClient";
import { GeminiAIService } from "./GeminiAIService";
// import { OpenAIAIService } from "./OpenAIAIService"; // future

export class AIServiceFactory {
  static create(provider: "gemini" | "openai" = "gemini"): IAIService {
    switch (provider) {
      case "gemini":
        return new GeminiAIService(new GeminiClient());

      // case "openai":
      //   return new OpenAIAIService(new OpenAIClient());

      default:
        throw new Error(`Unsupported AI provider: ${provider}`);
    }
  }
}
