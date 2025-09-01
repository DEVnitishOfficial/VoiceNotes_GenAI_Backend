"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteController = void 0;
const http_status_codes_1 = require("http-status-codes");
const note_repository_1 = require("./note.repository");
const note_service_1 = require("./note.service");
const GeminiAIService_1 = require("../ai/GeminiAIService");
const GeminiClient_1 = require("../ai/GeminiClient");
const win32_1 = __importDefault(require("path/win32"));
const audioConverter_1 = require("../../utils/helpers/audioConverter");
const FileStorageService_1 = require("../ai/FileStorageService");
const noteRepository = new note_repository_1.NoteRepositoryImpl();
const noteService = new note_service_1.NoteServiceImpl(noteRepository);
const geminiClient = new GeminiClient_1.GeminiClient();
const geminiAiService = new GeminiAIService_1.GeminiAIService(geminiClient);
exports.NoteController = {
    createNote(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = yield noteService.createNote(req.body);
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                success: "true",
                message: "Notes created successfully",
                data: note
            });
        });
    },
    findAllNotes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const notes = yield noteService.findAllNotes();
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: "true",
                message: "Notes retrieved successfully",
                data: notes
            });
        });
    },
    findNoteById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = yield noteService.findNoteById(req.params.id);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: "true",
                message: "Note retrieved successfully",
                data: note
            });
        });
    },
    updateNote(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = yield noteService.updateNote(req.params.id, req.body);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: "true",
                message: "Note updated successfully",
                data: note
            });
        });
    },
    removeNote(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = yield noteService.removeNote(req.params.id);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: "true",
                message: "Note deleted successfully",
                data: note
            });
        });
    },
    transcribeAudio(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!req.file) {
                    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                        success: false,
                        message: "No audio file uploaded",
                        data: null
                    });
                    return;
                }
                // full path of uploaded file
                let filePath = win32_1.default.resolve(req.file.path);
                // If uploaded file is webm → convert to wav
                if (req.file.mimetype === "audio/webm") {
                    filePath = yield (0, audioConverter_1.convertWebMToWav)(req.file.path);
                }
                // detect mimetype from multer
                const mimeType = req.file.mimetype || "audio/wav";
                const transcript = yield geminiAiService.transcribe(filePath, mimeType);
                if (!transcript) {
                    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                        success: false,
                        message: "Transcription failed",
                        data: null
                    });
                    return;
                }
                const created = yield noteService.createNote({
                    title: req.body.title || "Voice Note",
                    transcript: transcript,
                });
                // save the created note
                yield created.save();
                res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    success: true,
                    message: "Audio transcribed and note created successfully",
                    data: created
                });
            }
            catch (err) {
                res.status(500).json({ error: err.message || "Transcription failed" });
            }
            finally {
                if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) {
                    FileStorageService_1.FileStorageService.deleteFile(req.file.path);
                }
            }
        });
    },
    generateSummary(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const note = yield noteService.findNoteById(req.params.id);
                if (!note) {
                    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                        success: "false",
                        message: "Note not found",
                        data: null
                    });
                    return;
                }
                const summary = yield geminiAiService.summarize(note.transcript);
                note.summary = summary;
                yield note.save();
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    success: "true",
                    message: "Summary generated successfully",
                    summary: summary
                });
            }
            catch (err) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    success: "false",
                    message: err.message || "Failed to generate summary",
                    data: null
                });
            }
        });
    },
};
