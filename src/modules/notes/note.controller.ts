import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { NoteRepositoryImpl } from "./note.repository";
import { NoteServiceImpl } from "./note.service";

const noteRepository = new NoteRepositoryImpl();
const noteService = new NoteServiceImpl(noteRepository)

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
        console.log("Retrieved notes:", notes);
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
    }
};
