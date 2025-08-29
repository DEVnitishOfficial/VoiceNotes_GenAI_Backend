import { Schema, model, Document } from "mongoose";

export interface NoteDocument extends Document {
    title: string;
    transcript: string;
    summary?: string | null;
    audioUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;
    summaryGeneratedAt?: Date | null;
}

const noteSchema = new Schema<NoteDocument>(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            maxLength: [100, "Title must be less than 100 characters"],
            trim: true,
        },
        transcript: {
            type: String,
            required: true,
            trim: true,
        },
        summary: {
            type: String,
            default: null,
            trim: true,
        },
        audioUrl: {
            type: String,
            default: null,
        },
        summaryGeneratedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export const Note = model<NoteDocument>("Note", noteSchema);
