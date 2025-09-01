"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
// Map of allowed mimetypes to extensions
const mimeToExt = {
    "audio/webm": ".webm",
    "audio/wav": ".wav",
    "audio/mpeg": ".mp3",
    "audio/mp3": ".mp3",
    "video/mp4": ".mp4",
};
const storage = multer_1.default.diskStorage({
    destination: "uploads/",
    filename: (_req, file, cb) => {
        // Pick extension from mimetype map (fallback: use originalname extension)
        const ext = mimeToExt[file.mimetype] || path_1.default.extname(file.originalname).toLowerCase();
        // Unique name: uuid + extension
        cb(null, `${(0, uuid_1.v4)()}${ext}`);
    },
});
const fileFilter = (_req, file, cb) => {
    if (!mimeToExt[file.mimetype]) {
        return cb(new Error(`Unsupported file type: ${file.mimetype}`));
    }
    cb(null, true);
};
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 200 * 1024 * 1024 }, // 200 MB
    fileFilter,
});
exports.default = upload;
