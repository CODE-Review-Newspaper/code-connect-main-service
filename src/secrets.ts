import { config } from "dotenv";

config();

export const PORT = process.env.EXPRESS_PORT || 8001;
export const MONGODB_URL = process.env.MONGODB_CONNECTION_STRING;
export const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
export const GOOGLE_IOS_CLIENT_ID = process.env.IOS_CLIENT_ID;
export const GOOGLE_ANDROID_CLIENT_ID = process.env.ANDROID_CLIENT_ID;
