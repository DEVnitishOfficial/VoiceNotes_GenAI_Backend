"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ping_validator_1 = require("./ping.validator");
const ping_controller_1 = require("./ping.controller");
const pingRouter = express_1.default.Router();
pingRouter.post("/", ping_validator_1.validatePing, ping_controller_1.pingHandler);
exports.default = pingRouter;
