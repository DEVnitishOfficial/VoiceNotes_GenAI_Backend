"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validators_1 = require("../../validators");
const note_schema_1 = require("./note.schema");
const note_controller_1 = require("./note.controller");
const fileUpload_helper_1 = __importDefault(require("../../utils/helpers/fileUpload.helper"));
const noteRouter = express_1.default.Router();
noteRouter.post('/', (0, validators_1.validateRequestBody)(note_schema_1.createNoteSchema), note_controller_1.NoteController.createNote);
noteRouter.get('/', note_controller_1.NoteController.findAllNotes);
noteRouter.get('/:id', note_controller_1.NoteController.findNoteById);
noteRouter.put('/:id', (0, validators_1.validateRequestBody)(note_schema_1.updateNoteSchema), note_controller_1.NoteController.updateNote);
noteRouter.delete('/:id', note_controller_1.NoteController.removeNote);
noteRouter.post('/transcribe', fileUpload_helper_1.default.single('audio'), note_controller_1.NoteController.transcribeAudio);
noteRouter.post('/summary/:id', note_controller_1.NoteController.generateSummary);
exports.default = noteRouter;
