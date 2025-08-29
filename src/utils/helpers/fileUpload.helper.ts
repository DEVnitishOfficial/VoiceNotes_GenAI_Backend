
import path from "path";
import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_req, file, cb) => {
    cb(null, file.originalname); // preserve original filename
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExts = [".jpg", ".jpeg", ".webp", ".mp4", ".mp3", ".png", ".wav"];

  if (!allowedExts.includes(ext)) {
    cb(new Error(`Unsupported file type ${ext}`));
    return;
  }

  cb(null, true);
};

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 200 * 1024 * 1024 }, // 200 MB
  storage,
  fileFilter,
});

export default upload;
