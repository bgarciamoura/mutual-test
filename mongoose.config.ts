import mongoose from 'mongoose';

const db_config = mongoose.connect(
    'mongodb://host.docker.internal:27017/task-management',
    {
        auth: {
            username: 'mutual',
            password: 'mutual',
        },
        authSource: 'admin',
        dbName: 'mutual',
    },
    (err) => {
        if (err) {
            console.error('failed to connect to mongoDB');
            console.error(err);
        } else {
            console.log('mongodb is running and secured');
        }
    }
);

export { db_config };
