import express, { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { NoteRepositoryImpl } from "./note.repository";
import { NoteServiceImpl } from "./note.service";
import { GeminiAIService } from "../ai/GeminiAIService";
import { GeminiClient } from "../ai/GeminiClient";
import path from "path/win32";
import { convertWebMToWav } from "../../utils/helpers/audioConverter";
import { FileStorageService } from "../ai/FileStorageService";

const noteRepository = new NoteRepositoryImpl();
const noteService = new NoteServiceImpl(noteRepository)


const geminiClient = new GeminiClient();
const geminiAiService = new GeminiAIService(geminiClient);
export const NoteController = {
    async createNote(req: Request, res: Response, next: NextFunction): Promise<void> {

        const note = await noteService.createNote(req.body)
        res.status(StatusCodes.CREATED).json({
            success: "true",
            message: "Notes created successfully",
            data: note
        });
    },

    async findAllNotes(req: Request, res: Response, next: NextFunction): Promise<void> {

        const notes = await noteService.findAllNotes();

        res.status(StatusCodes.OK).json({
            success: "true",
            message: "Notes retrieved successfully",
            data: notes
        });
    },

    async findNoteById(req: Request, res: Response, next: NextFunction): Promise<void> {

        const note = await noteService.findNoteById(req.params.id);

        res.status(StatusCodes.OK).json({
            success: "true",
            message: "Note retrieved successfully",
            data: note
        });
    },

    async updateNote(req: Request, res: Response, next: NextFunction): Promise<void> {

        const note = await noteService.updateNote(req.params.id, req.body);

        res.status(StatusCodes.OK).json({
            success: "true",
            message: "Note updated successfully",
            data: note
        });
    },

    async removeNote(req: Request, res: Response, next: NextFunction): Promise<void> {

        const note = await noteService.removeNote(req.params.id);

        res.status(StatusCodes.OK).json({
            success: "true",
            message: "Note deleted successfully",
            data: note
        });
    },

    async transcribeAudio(req: Request & { file?: any }, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.file) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: "No audio file uploaded",
                    data: null
                });
                return;
            }

             // full path of uploaded file
            let filePath = path.resolve(req.file.path);

            // If uploaded file is webm → convert to wav
            if (req.file.mimetype === "audio/webm") {
                filePath = await convertWebMToWav(req.file.path);
            }

           

            // detect mimetype from multer
            const mimeType = req.file.mimetype || "audio/wav";

            const transcript = await geminiAiService.transcribe(filePath, mimeType);
            if (!transcript) {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: "Transcription failed",
                    data: null
                });
                return;
            }

            const created = await noteService.createNote({
                title: req.body.title || "Voice Note",
                transcript: transcript,
            });

            // save the created note
            await created.save();

            res.status(StatusCodes.CREATED).json({
                success: true,
                message: "Audio transcribed and note created successfully",
                data: created
            });
        } catch (err: any) {
            res.status(500).json({ error: err.message || "Transcription failed" });
        }finally {
            if (req.file?.path) {
                FileStorageService.deleteFile(req.file.path);
            }
        }
    },

    async generateSummary(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const note = await noteService.findNoteById(req.params.id);
            if (!note) {
                res.status(StatusCodes.NOT_FOUND).json({
                    success: "false",
                    message: "Note not found",
                    data: null
                });
                return;
            }

            const summary = await geminiAiService.summarize(note.transcript);
            note.summary = summary;
            await note.save();

            res.status(StatusCodes.OK).json({
                success: "true",
                message: "Summary generated successfully",
                summary: summary
            });
        } catch (err: any) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: "false",
                message: err.message || "Failed to generate summary",
                data: null
            });
        }
    },
};
