import { GoogleGenAI } from "@google/genai";
import { serverConfig } from "../../config";
import { internalServerError } from "../../utils/errors/app.error";
import fs from "fs";

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

  async transcribeFile(filePath: string, mimeType: string): Promise<string> {
    console.log("calling from GeminiClient");

    // read file into buffer
    const fileBuffer = fs.readFileSync(filePath);

    // encode as base64
    const base64Audio = fileBuffer.toString("base64");

    const resp = await this.ai.models.generateContent({
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
