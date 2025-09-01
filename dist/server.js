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
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const index_router_1 = __importDefault(require("./routers/v1/index.router"));
const index_router_2 = __importDefault(require("./routers/v2/index.router"));
const error_middleware_1 = require("./middlewares/error.middleware");
const logger_config_1 = __importDefault(require("./config/logger.config"));
const correlation_middleware_1 = require("./middlewares/correlation.middleware");
const db_config_1 = require("./config/db.config");
const cors_1 = __importDefault(require("cors"));
// use process.cwd() instead of import.meta to get project root directory at runtime
// const __dirname = process.cwd()
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
// app.use(express.static(path.join(__dirname,'client/dist')))
app.use(correlation_middleware_1.attachCorrelationIdMiddleware);
app.use('/api/v1', index_router_1.default);
app.use('/api/v2', index_router_2.default);
app.use(error_middleware_1.genericErrorHandler);
app.listen(config_1.serverConfig.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`server is listening at  http://localhost:${config_1.serverConfig.PORT}`);
    logger_config_1.default.info("press Ctrl + C to stop the server", { "name": "dev-server" });
    yield (0, db_config_1.connectToDB)();
}));
