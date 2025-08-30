import express from 'express'
import { serverConfig } from './config';
import v1Router from './routers/v1/index.router';
import v2Router from './routers/v2/index.router';
import { genericErrorHandler } from './middlewares/error.middleware';
import logger from './config/logger.config';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';
import { connectToDB } from './config/db.config';
import cors from 'cors'



const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",  // frontend vite url
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))


app.use(attachCorrelationIdMiddleware)

app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

app.use(genericErrorHandler);

app.listen(serverConfig.PORT, async () => {
    console.log(`server is listening at  http://localhost:${serverConfig.PORT}`)
    logger.info("press Ctrl + C to stop the server", { "name": "dev-server" })
    await connectToDB()
});