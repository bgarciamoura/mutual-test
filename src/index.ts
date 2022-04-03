import { app, PORT } from './server';

app.listen(PORT, () => {
    console.log(`Server running and listening on port:${PORT}!`);
});
