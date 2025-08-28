import { NoteDocument } from "./note.model";
import { NoteRepository } from "./note.repository";
import { createNoteDto } from "./note.schema";


export interface NoteService {
    createNote(note: createNoteDto): Promise<NoteDocument>;
}

export class NoteServiceImpl implements NoteService {

    private noteRepository: NoteRepository

    constructor(noteRepository: NoteRepository) {
        this.noteRepository = noteRepository
        console.log("NoteService constructor called")
    }

    async createNote(note: createNoteDto): Promise<NoteDocument> {
        return await this.noteRepository.createNote(note)
    }

    async findAllNotes(): Promise<NoteDocument[]> {
        return await this.noteRepository.findAll();
    }

    async findNoteById(id: string): Promise<NoteDocument | null> {
        return await this.noteRepository.findById(id);
    }

    async updateNote(id: string, note: Partial<NoteDocument>): Promise<NoteDocument | null> {
        return await this.noteRepository.update(id, note);
    }

    async removeNote(id: string): Promise<NoteDocument | null> {
        return await this.noteRepository.remove(id);
    }

}