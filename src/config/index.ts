
import dotenv from 'dotenv'

type ServerConfig = {
    PORT:number
    DB_URL:string
}
function loadEnv(){
    dotenv.config()
}

loadEnv()

export const serverConfig:ServerConfig = {
    PORT: Number(process.env.PORT) || 3002,
    DB_URL: process.env.DB_URL || "mongodb://localhost:27017/mydatabase",
}