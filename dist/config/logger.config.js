"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const request_helpers_1 = require("../utils/helpers/request.helpers");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const logger = winston_1.default.createLogger({
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "MM:DD:YYYY HH:MM:SS" }), winston_1.default.format.json(), // format the log message as json
    // defining custom print
    winston_1.default.format.printf((_a) => {
        var { timestamp, level, message } = _a, data = __rest(_a, ["timestamp", "level", "message"]);
        const output = { level, message, timestamp, correlationId: (0, request_helpers_1.getCorrelationId)(), data };
        return JSON.stringify(output);
    })),
    transports: [
        new winston_1.default.transports.Console(),
        // new winston.transports.File({filename:'logs/app.log'})
        new winston_daily_rotate_file_1.default({
            filename: 'logs/application-%DATE%-app.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '14d'
        }),
    ]
});
exports.default = logger;
// TODO: add logic to integrate and save logs in mongodb
// new MongoDB({
//     db: String(process.env.MONGO_URI) || 'mongodb://localhost:27017/logs_db',
//     options: {
//       useUnifiedTopology: true,
//     },
//     collection: 'log_entries',
//     tryReconnect: true,
//   })
