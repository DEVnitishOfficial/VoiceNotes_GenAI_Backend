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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteServiceImpl = void 0;
const app_error_1 = require("../../utils/errors/app.error");
class NoteServiceImpl {
    constructor(noteRepository) {
        this.noteRepository = noteRepository;
        console.log("NoteService constructor called");
    }
    createNote(note) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.noteRepository.createNote(note);
        });
    }
    findAllNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.noteRepository.findAll();
        });
    }
    findNoteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.noteRepository.findById(id);
        });
    }
    updateNote(id, note) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield this.noteRepository.findById(id);
            if (!existing)
                throw new app_error_1.NotFoundError("Note not found");
            if (note.transcript && note.transcript !== existing.transcript) {
                note.summary = null;
                note.summaryGeneratedAt = null;
            }
            return yield this.noteRepository.update(id, note);
        });
    }
    removeNote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.noteRepository.remove(id);
        });
    }
}
exports.NoteServiceImpl = NoteServiceImpl;
