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
exports.NoteRepositoryImpl = void 0;
const logger_config_1 = __importDefault(require("../../config/logger.config"));
const app_error_1 = require("../../utils/errors/app.error");
const note_model_1 = require("./note.model");
class NoteRepositoryImpl {
    constructor() {
        console.log("Note repository called");
    }
    createNote(note) {
        return __awaiter(this, void 0, void 0, function* () {
            const newNote = new note_model_1.Note(note);
            if (!newNote) {
                logger_config_1.default.error("Failed to create note", { data: "NoteRepository" });
                throw new app_error_1.internalServerError("Failed to create note");
            }
            return yield newNote.save();
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Finding all notes in repository");
            const allNote = yield note_model_1.Note.find({});
            if (!allNote) {
                logger_config_1.default.error("No notes found", { name: "NoteRepository" });
                throw new app_error_1.NotFoundError("No notes found");
            }
            return allNote;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = yield note_model_1.Note.findById(id);
            if (!note) {
                logger_config_1.default.error("Note not found", { name: "NoteRepository" });
                throw new app_error_1.NotFoundError("Note not found");
            }
            return note;
        });
    }
    update(id, note) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedNote = yield note_model_1.Note.findByIdAndUpdate(id, note, { new: true });
            if (!updatedNote) {
                logger_config_1.default.error("Failed to update note", { name: "NoteRepository" });
                throw new app_error_1.internalServerError("Failed to update note");
            }
            return updatedNote.save();
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedNote = yield note_model_1.Note.findByIdAndDelete(id);
            if (!deletedNote) {
                logger_config_1.default.error("Failed to delete note", { name: "NoteRepository" });
                throw new app_error_1.internalServerError("Failed to delete note");
            }
            return deletedNote;
        });
    }
}
exports.NoteRepositoryImpl = NoteRepositoryImpl;
