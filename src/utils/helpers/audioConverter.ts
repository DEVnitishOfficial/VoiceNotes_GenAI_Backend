import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import path from "path";

ffmpeg.setFfmpegPath(ffmpegPath.path);

export async function convertWebMToWav(inputPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const outputPath = inputPath.replace(path.extname(inputPath), ".wav");

    ffmpeg(inputPath)
      .toFormat("wav")
      .on("error", (err) => reject(err))
      .on("end", () => resolve(outputPath))
      .save(outputPath);
  });
}
