"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNoteSchema = exports.createNoteSchema = void 0;
const zod_1 = require("zod");
exports.createNoteSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    transcript: zod_1.z.string().min(1, "Transcript is required"),
    summary: zod_1.z.string().optional(),
});
exports.updateNoteSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    transcript: zod_1.z.string().min(1).optional(),
    summary: zod_1.z.string().optional(),
});
