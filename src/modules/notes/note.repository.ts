import logger from "../../config/logger.config";
import { internalServerError, NotFoundError } from "../../utils/errors/app.error";
import { Note, NoteDocument } from "./note.model";

export interface NoteRepository {
    createNote(note: Partial<NoteDocument>): Promise<NoteDocument>;
    findAll(): Promise<NoteDocument[]>;
    findById(id: string): Promise<NoteDocument | null>;
    update(id: string, note: Partial<NoteDocument>): Promise<NoteDocument | null>;
    remove(id: string): Promise<NoteDocument | null>;
}


export class NoteRepositoryImpl implements NoteRepository {

    constructor() {
        console.log("Note repository called")
    }

    async createNote(note: Partial<NoteDocument>): Promise<NoteDocument> {
        const newNote = new Note(note)
        if (!newNote) {
            logger.error("Failed to create note", { data: "NoteRepository" });
            throw new internalServerError("Failed to create note");
        }
        return await newNote.save();
    }

    async findAll(): Promise<NoteDocument[]> {
        console.log("Finding all notes in repository");
        const allNote = await Note.find({});
        console.log("All notes found:", allNote);

        if (!allNote) {
            logger.error("No notes found", { name: "NoteRepository" });
            throw new NotFoundError("No notes found");
        }

        return allNote;
    }

    async findById(id: string): Promise<NoteDocument | null> {

        const note = await Note.findById(id);

        if (!note) {
            logger.error("Note not found", { name: "NoteRepository" });
            throw new NotFoundError("Note not found");
        }

        return note;
    }

    async update(id: string, note: Partial<NoteDocument>): Promise<NoteDocument | null> {

        const updatedNote = await Note.findByIdAndUpdate(id, note, { new: true });

        if (!updatedNote) {
            logger.error("Failed to update note", { name: "NoteRepository" });
            throw new internalServerError("Failed to update note");
        }

        return updatedNote;
    }

    async remove(id: string): Promise<NoteDocument | null> {

        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            logger.error("Failed to delete note", { name: "NoteRepository" });
            throw new internalServerError("Failed to delete note");
        }

        return deletedNote;
    }

}

























// import { NoteModel } from "./note.model";

// export const create = async (data: { title: string; transcript: string }): Promise<void> => {
//   const note = new NoteModel(data);
//   return await note.save();
// };

// export const findAll = async (): Promise<NoteDocument[]> => {
//   return await NoteModel.find().sort({ createdAt: -1 });
// };

// export const findById = async (id: string): Promise<NoteDocument | null> => {
//   return await NoteModel.findById(id);
// };

// export const update = async (id: string, data: Partial<{ title: string; transcript: string }>): Promise<NoteDocument | null> => {
//   return await NoteModel.findByIdAndUpdate(id, data, { new: true });
// };

// export const remove = async (id: string): Promise<NoteDocument | null> => {
//   return await NoteModel.findByIdAndDelete(id);
// };
