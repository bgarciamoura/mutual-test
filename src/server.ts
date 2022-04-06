import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';

import { db_config } from '../mongoose.config';
import { accountsRoutes } from './routes/account.routes';
import { movementRoutes } from './routes/movement.routes';
import swaggerDocument from '../swagger.config.json';

const PORT = process.env.PORT || 3333;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

db_config;

app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', accountsRoutes);
app.use('/api/v1', movementRoutes);

app.get('/api/v1', (req, res) => {
    res.send('Welcome to the API');
});

export { app, PORT };
