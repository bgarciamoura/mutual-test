import express from 'express';
import cors from 'cors';

import { db_config } from '../mongoose.config';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3333;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server running and listening on port:${PORT}!`);
});
