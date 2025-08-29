export interface IAIService {
  transcribe(filePath: string, mimeType?: string): Promise<string>;
  summarize(text: string, maxSentences?: number): Promise<string>;
}
