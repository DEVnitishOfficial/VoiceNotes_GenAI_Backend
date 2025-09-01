"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingSchema = void 0;
const zod_1 = require("zod");
exports.pingSchema = zod_1.z.object({
    message: zod_1.z.string().min(1, "Message is required"),
});
