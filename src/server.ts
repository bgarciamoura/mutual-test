import express from 'express';
import cors from 'cors';

import { db_config } from '../mongoose.config';
import { accountsRoutes } from './routes/account.routes';

const PORT = process.env.PORT || 3333;
const app = express();
app.use(express.json());
app.use(cors());

db_config;

app.use('/api/v1', accountsRoutes);

export { app, PORT };
