import request from 'supertest';
import { Account } from '../../entities/Account';
import { Movement } from '../../entities/Movement';
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

describe('Test my moviment routes', () => {
    it('should create an account and create a credit movement for that account', async () => {
        expect.assertions(4);

        const account = await request(app).post('/api/v1/accounts').send({
            name: 'Test Account',
            cpf: '469.282.480-84',
        });

        const movement = await request(app).post('/api/v1/movement/credit').send({
            accountId: account.body.UUID,
            value: 100,
        });

        expect(movement.body.savedMovement.value).toBe(100);
        expect(movement.body.savedMovement.type).toBe('credit');
        expect(movement.body.savedMovement.accountId).toBe(account.body.UUID);
        expect(movement.status).toBe(201);
    });

    it('should create an account and not create a debit movement for not having balance', async () => {
        expect.assertions(2);

        const account = await request(app).post('/api/v1/accounts').send({
            name: 'Test Account',
            cpf: '658.698.710-50',
        });

        const movement = await request(app).post('/api/v1/movement/debit').send({
            accountId: account.body.UUID,
            value: 100,
        });

        console.log('movement.body: ', movement.body);

        expect(movement.body.error).toBe('Error on debit, account not found or insuficient funds');
        expect(movement.status).toBe(500);
    });

    it('should create an account and create a debit movement for that account', async () => {
        expect.assertions(7);

        const account = await request(app).post('/api/v1/accounts').send({
            name: 'Test Account',
            cpf: '046.701.690-92',
        });

        const creditMovement = await request(app).post('/api/v1/movement/credit').send({
            accountId: account.body.UUID,
            value: 100,
        });

        const debitMovement = await request(app).post('/api/v1/movement/debit').send({
            accountId: account.body.UUID,
            value: 100,
        });

        expect(creditMovement.body.savedMovement.value).toBe(100);
        expect(creditMovement.body.savedMovement.type).toBe('credit');
        expect(creditMovement.body.savedMovement.accountId).toBe(account.body.UUID);
        expect(debitMovement.body.savedMovement.value).toBe(100);
        expect(debitMovement.body.savedMovement.type).toBe('debit');
        expect(debitMovement.body.savedMovement.accountId).toBe(account.body.UUID);
        expect(debitMovement.status).toBe(201);
    });

    it('should create two accounts and make a transfer movement between then', async () => {
        expect.assertions(9);

        const account1 = await request(app).post('/api/v1/accounts').send({
            name: 'Test Account 1',
            cpf: '455.565.760-84',
        });

        const account2 = await request(app).post('/api/v1/accounts').send({
            name: 'Test Account 2',
            cpf: '460.133.480-22',
        });

        const creditMovement1 = await request(app).post('/api/v1/movement/credit').send({
            accountId: account1.body.UUID,
            value: 100,
        });

        const creditMovement2 = await request(app).post('/api/v1/movement/credit').send({
            accountId: account2.body.UUID,
            value: 100,
        });

        const transferMovement = await request(app).post('/api/v1/movement/transfer').send({
            accountId: account1.body.UUID,
            value: 100,
            targetAccountId: account2.body.UUID,
        });

        expect(creditMovement1.body.savedMovement.value).toBe(100);
        expect(creditMovement1.body.savedMovement.type).toBe('credit');
        expect(creditMovement1.body.savedMovement.accountId).toBe(account1.body.UUID);
        expect(creditMovement2.body.savedMovement.value).toBe(100);
        expect(creditMovement2.body.savedMovement.type).toBe('credit');
        expect(creditMovement2.body.savedMovement.accountId).toBe(account2.body.UUID);
        expect(transferMovement.body.accountBalance).toBe(0);
        expect(transferMovement.body.targetAccountBalance).toBe(200);
        expect(transferMovement.status).toBe(201);
    });

    it('should create two accounts and not make a transfer movement for not having balance', async () => {
        expect.assertions(5);

        const account1 = await request(app).post('/api/v1/accounts').send({
            name: 'Test Account 1',
            cpf: '455.565.760-84',
        });

        const account2 = await request(app).post('/api/v1/accounts').send({
            name: 'Test Account 2',
            cpf: '460.133.480-22',
        });

        const creditMovement2 = await request(app).post('/api/v1/movement/credit').send({
            accountId: account2.body.UUID,
            value: 100,
        });

        const transferMovement = await request(app).post('/api/v1/movement/transfer').send({
            accountId: account1.body.UUID,
            value: 100,
            targetAccountId: account2.body.UUID,
        });

        expect(creditMovement2.body.savedMovement.value).toBe(100);
        expect(creditMovement2.body.savedMovement.type).toBe('credit');
        expect(creditMovement2.body.savedMovement.accountId).toBe(account2.body.UUID);
        expect(transferMovement.body.error).toBe('Error on debit, account not found or insuficient funds');
        expect(transferMovement.status).toBe(500);
    });
});
