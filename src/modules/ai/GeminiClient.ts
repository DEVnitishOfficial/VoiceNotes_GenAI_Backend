import { GoogleGenAI } from "@google/genai";
import { serverConfig } from "../../config";
import { internalServerError } from "../../utils/errors/app.error";

export class GeminiClient {
  private ai: GoogleGenAI;
  private audioModel: string;
  private summaryModel: string;

  constructor() {
       if (!serverConfig.GEMINI_API_KEY) {
         throw new internalServerError("GEMINI_API_KEY is not set in .env");
       }
    this.ai = new GoogleGenAI({ apiKey: serverConfig.GEMINI_API_KEY });
    this.audioModel = serverConfig.GEMINI_AUDIO_MODEL;
    this.summaryModel = serverConfig.GEMINI_SUMMARY_MODEL;
  }

  async transcribeFile(filePath: string, mimeType = "audio/mpeg/mp3/wav"): Promise<string> {
    const uploaded = await this.ai.files.upload({
      file: filePath,
      config: { mimeType },
    });

    const resp = await this.ai.models.generateContent({
      model: this.audioModel,
      contents: [uploaded, "Transcribe the audio. Return only the text."],
    });

    const text = (resp as any)?.text || (resp as any)?.outputText;
    if (!text) throw new internalServerError("Gemini transcription returned empty result");

    return text.trim();
  }

  async summarizeText(text: string, maxSentences = 3): Promise<string> {
    const prompt = `Summarize the following note in ${maxSentences} short sentences:\n\n${text}`;

    const resp = await this.ai.models.generateContent({
      model: this.summaryModel,
      contents: [prompt],
    });

    const summary = (resp as any)?.text || (resp as any)?.outputText;
    if (!summary) throw new internalServerError("Gemini summarization returned empty result");

    return summary.trim();
  }
}
