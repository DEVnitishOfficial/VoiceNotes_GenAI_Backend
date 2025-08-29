
import dotenv from 'dotenv'

type ServerConfig = {
    PORT:number
    DB_URL:string
    GEMINI_API_KEY:string
    GEMINI_AUDIO_MODEL:string
    GEMINI_SUMMARY_MODEL:string
    AI_PROVIDER:string
}
function loadEnv(){
    dotenv.config()
}

loadEnv()

export const serverConfig:ServerConfig = {
    PORT: Number(process.env.PORT) || 3002,
    DB_URL: process.env.DB_URL || "mongodb://localhost:27017/mydatabase",
    GEMINI_API_KEY : process.env.GEMINI_API_KEY || '',
    GEMINI_AUDIO_MODEL: process.env.GEMINI_AUDIO_MODEL || 'gemini-2.5-pro',
    GEMINI_SUMMARY_MODEL : process.env.GEMINI_SUMMARY_MODEL || 'gemini-2.5-pro',
    AI_PROVIDER: process.env.AI_PROVIDER || "gemini"
}
