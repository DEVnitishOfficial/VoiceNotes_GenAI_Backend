"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const mongoose_1 = require("mongoose");
const noteSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.Note = (0, mongoose_1.model)("Note", noteSchema);
