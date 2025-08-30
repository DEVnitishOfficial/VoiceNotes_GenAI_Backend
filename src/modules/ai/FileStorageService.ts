import fs from "fs";

export class FileStorageService {
  static deleteFile(filePath: string): void {
    if (!filePath) return;
    fs.unlink(filePath, (err) => {
      if (err) console.warn(`File cleanup failed for ${filePath}:`, err.message);
    });
  }

  static deleteFiles(filePaths: string[]): void {
    if (!filePaths || filePaths.length === 0) return;
    filePaths.forEach((filePath) => this.deleteFile(filePath));
  }
}
