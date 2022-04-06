import request from 'supertest';
import { app } from '../../server';
import * as mockdb from '../mockdb';

beforeAll(async () => {
    await mockdb.connect();
});

afterEach(async () => {
    await mockdb.clearDatabase();
});

afterAll(async () => {
    await mockdb.disconnect();
});

describe('Test my account routes', () => {
    it('should return a 200 response', async () => {
        expect.assertions(1);
        const response = await request(app).get('/api/v1/accounts');
        expect(response.status).toBe(200);
    });

    it('should return a 404 response', async () => {
        expect.assertions(1);
        const response = await request(app).get('/api/v1/accounts/1');
        expect(response.status).toBe(404);
    });

    it('should not create an account', async () => {
        expect.assertions(1);
        const response = await request(app).post('/api/v1/accounts');
        expect(response.status).toBe(500);
    });

    it('should not update an account', async () => {
        expect.assertions(1);
        const response = await request(app).put('/api/v1/accounts/1');
        expect(response.status).toBe(400);
    });

    it('should not delete an account', async () => {
        expect.assertions(1);
        const response = await request(app).delete('/api/v1/accounts/1');
        expect(response.status).toBe(400);
    });

    it('should not find an account', async () => {
        expect.assertions(1);
        const response = await request(app).get('/api/v1/accounts/1');
        expect(response.status).toBe(404);
    });

    it('should create an account', async () => {
        expect.assertions(1);
        const response = await request(app).post('/api/v1/accounts').send({
            name: 'Test Account',
            cpf: '184.662.790-75',
        });
        expect(response.status).toBe(201);
    });

    it('should not create an account', async () => {
        expect.assertions(1);
        const response = await request(app).post('/api/v1/accounts').send({
            name: 'Test Account',
            cpf: '123.456.789-00',
        });
        expect(response.status).toBe(400);
    });

    it('should create and update an account', async () => {
        expect.assertions(1);

        const accountForUpdate = await request(app).post('/api/v1/accounts').send({
            name: 'Test Account',
            cpf: '559.654.450-75',
        });

        const response = await request(app).put(`/api/v1/accounts/${accountForUpdate.body.UUID}`).send({
            name: 'Test Account Updated',
        });

        expect(response.status).toBe(200);
    });

    it('should create and delete an account', async () => {
        expect.assertions(1);

        const accountForDelete = await request(app).post('/api/v1/accounts').send({
            name: 'Test Account',
            cpf: '035.912.160-89',
        });

        const response = await request(app).delete(`/api/v1/accounts/${accountForDelete.body.UUID}`);

        expect(response.status).toBe(204);
    });

    it('should create and get an account balance', async () => {
        expect.assertions(1);

        const accountForBalance = await request(app).post('/api/v1/accounts').send({
            name: 'Test Account',
            cpf: '715.593.170-51',
        });

        const response = await request(app).get(`/api/v1/accounts/${accountForBalance.body.UUID}/balance`);

        console.log(response.body);
        expect(response.status).toBe(200);
    });
});
