import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongodb = new MongoMemoryServer();

export const connect = async () => {
    const uri = 'mongodb://host.docker.internal:27017/task-management';

    const mongooseOpts = {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
        poolSize: 10,
    };

    await mongoose.connect(uri, {
        auth: {
            username: 'mutual',
            password: 'mutual',
        },
        authSource: 'admin',
        dbName: 'mutual',
    });
};

export const disconnect = async () => {
    await mongoose.connection.close();
    await mongodb.stop();
};

export const clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
};
