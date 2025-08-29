import express from 'express'
import { validateRequestBody } from '../../validators'
import { createNoteSchema, updateNoteSchema } from './note.schema'
import { NoteController } from './note.controller'
import upload from '../../utils/helpers/fileUpload.helper'

const noteRouter = express.Router()

noteRouter.post('/', validateRequestBody(createNoteSchema), NoteController.createNote);
noteRouter.get('/', NoteController.findAllNotes);
noteRouter.get('/:id', NoteController.findNoteById);
noteRouter.put('/:id', validateRequestBody(updateNoteSchema), NoteController.updateNote);
noteRouter.delete('/:id', NoteController.removeNote);
noteRouter.post('/transcribe', upload.single('audio'), NoteController.transcribeAudio);
noteRouter.post('/summary/:id', NoteController.generateSummary);

export default noteRouter;

