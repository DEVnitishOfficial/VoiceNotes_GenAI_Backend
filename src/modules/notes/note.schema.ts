import { z } from "zod";

export const createNoteSchema = z.object({
    title: z.string().min(1, "Title is required"),
    transcript: z.string().min(1, "Transcript is required"),
    summary: z.string().optional(),
});

export const updateNoteSchema = z.object({
    title: z.string().min(1).optional(),
    transcript: z.string().min(1).optional(),
    summary: z.string().optional(),
});


export type createNoteDto = z.infer<typeof createNoteSchema>;
export type updateNoteDto = z.infer<typeof updateNoteSchema>;