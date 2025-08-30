import path from "path";
import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import { v4 as uuidv4 } from "uuid";

// Map of allowed mimetypes to extensions
const mimeToExt: Record<string, string> = {
  "audio/webm": ".webm",
  "audio/wav": ".wav",
  "audio/mpeg": ".mp3",
  "audio/mp3": ".mp3",
  "video/mp4": ".mp4",
};

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_req, file, cb) => {
    // Pick extension from mimetype map (fallback: use originalname extension)
    const ext =
      mimeToExt[file.mimetype] || path.extname(file.originalname).toLowerCase();
    // Unique name: uuid + extension
    cb(null, `${uuidv4()}${ext}`);
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!mimeToExt[file.mimetype]) {
    return cb(new Error(`Unsupported file type: ${file.mimetype}`));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200 MB
  fileFilter,
});

export default upload;
