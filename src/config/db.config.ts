import { serverConfig } from ".";
import logger from "./logger.config"
import mongoose from 'mongoose'


export const connectToDB = async() => {

    try{

        const dbUrl = serverConfig.DB_URL;

        const conn = await mongoose.connect(dbUrl);

         console.log(`MongoDB Connected successfully on : ${conn.connection.host}`);

        mongoose.connection.on("error", (error) => {
            logger.info("Mongodb connection error",error)
        })

        mongoose.connection.on("disconnected",() => {
            logger.warn("MongoDB disconnected")
        })

        process.on("SIGINT", async() => {
            await mongoose.connection.close();
            logger.info("Mongodb connection closed");
            process.exit(0); // success exit
        })

    }catch(error){
        logger.error("Failed to connect to mongodb",error);
        process.exit(1); // failure exit
    }
}