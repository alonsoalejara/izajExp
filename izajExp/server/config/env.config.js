import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envFilePath = path.resolve(__dirname, './.env');

dotenv.config({ path: envFilePath });

export const SALUDO = process.env.SALUDO;
export const DB_URL = process.env.DB_URL;