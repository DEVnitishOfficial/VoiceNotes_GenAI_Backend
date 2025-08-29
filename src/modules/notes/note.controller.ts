import express, { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { NoteRepositoryImpl } from "./note.repository";
import { NoteServiceImpl } from "./note.service";
import { AIServiceFactory } from "../ai/AIServiceFactory";
import { serverConfig } from "../../config";

const noteRepository = new NoteRepositoryImpl();
const noteService = new NoteServiceImpl(noteRepository)


const aiService = AIServiceFactory.create(serverConfig.AI_PROVIDER as "gemini" | "openai");

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
            if (!req.file){
                res.status(StatusCodes.BAD_REQUEST).json({
                     success: false,
                     message : "No audio file uploaded",
                     data: null
                });
                return;
            }

            const transcript = await aiService.transcribe(req.file.path, req.file.mimetype);

            const created = await noteService.createNote({
                title: req.body.title || "Voice Note",
                transcript: transcript,
            });

            res.status(StatusCodes.CREATED).json({
                success : true,
                message : "Audio transcribed and note created successfully",
                data: created
            });
        } catch (err: any) {
            res.status(500).json({ error: err.message || "Transcription failed" });
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

            const summary = await aiService.summarize(note.transcript);
            res.status(StatusCodes.OK).json({
                success: "true",
                message: "Summary generated successfully",
                data: summary
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
