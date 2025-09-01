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
exports.convertWebMToWav = convertWebMToWav;
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const ffmpeg_1 = __importDefault(require("@ffmpeg-installer/ffmpeg"));
const path_1 = __importDefault(require("path"));
fluent_ffmpeg_1.default.setFfmpegPath(ffmpeg_1.default.path);
function convertWebMToWav(inputPath) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const outputPath = inputPath.replace(path_1.default.extname(inputPath), ".wav");
            (0, fluent_ffmpeg_1.default)(inputPath)
                .toFormat("wav")
                .on("error", (err) => reject(err))
                .on("end", () => resolve(outputPath))
                .save(outputPath);
        });
    });
}
