import { config } from "dotenv";

config()

export const PORT = process.env.EXPRESS_PORT || 8001
export const MONGODB_URL = process.env.MONGODB_CONNECTION_STRING