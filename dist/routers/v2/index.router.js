"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ping_router_1 = __importDefault(require("../../modules/ping/ping.router"));
const v2Router = express_1.default.Router();
v2Router.use('/ping', ping_router_1.default);
exports.default = v2Router;
