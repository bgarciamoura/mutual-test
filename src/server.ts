import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { db_config } from '../mongoose.config';
import { accountsRoutes } from './routes/account.routes';
import { movementRoutes } from './routes/movement.routes';

const PORT = process.env.PORT || 3333;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

db_config;

app.use('/api/v1', accountsRoutes);
app.use('/api/v1', movementRoutes);

export { app, PORT };
