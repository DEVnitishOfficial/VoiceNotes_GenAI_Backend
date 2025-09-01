"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorageService = void 0;
const fs_1 = __importDefault(require("fs"));
class FileStorageService {
    static deleteFile(filePath) {
        if (!filePath)
            return;
        fs_1.default.unlink(filePath, (err) => {
            if (err)
                console.warn(`File cleanup failed for ${filePath}:`, err.message);
        });
    }
    static deleteFiles(filePaths) {
        if (!filePaths || filePaths.length === 0)
            return;
        filePaths.forEach((filePath) => this.deleteFile(filePath));
    }
}
exports.FileStorageService = FileStorageService;
