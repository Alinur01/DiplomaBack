import mongoose from 'mongoose';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import handleValidatorErrors from './utils/handleValidatorErrors.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Mongo DB успешно запущен'))
    .catch((err) => console.log('Ошибка при запуске Mongo DB', err));

const index = express();

index.use(express.json());

index.use(cors({
    origin: process.env.CORS_ORIGIN
}));

index.use('/uploads', express.static(path.join(__dirname, 'upload')));

index.use('/api', router);

index.use(handleValidatorErrors)


// Запуск сервера
const PORT = process.env.PORT || 5001;
mongoose.set('strictQuery', false);
index.listen(PORT, (err) => {
    if (err) {
        return console.log('Произошла ошибка', err);
    }
    console.log(`Сервер запущен на порту ${PORT}`);
});
