import { isUuid, uuid } from 'uuidv4';
import { Movement } from '../../entities/Movement';
import { IMovement } from '../../interfaces/Movement';
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

describe('Movement creation test', () => {
    it('can be created correctly', async () => {
        expect.assertions(6);

        const id = uuid();
        const accountId = uuid();

        const movement: IMovement = new Movement();

        movement.UUID = id;
        movement.accountId = accountId;
        movement.value = 100;
        movement.type = 'credit';
        movement.created_at = new Date();

        await movement.save();

        const movementFound = await Movement.findOne({ UUID: id });

        expect(movementFound).toBeDefined();
        expect(movementFound).toBeInstanceOf(Movement);
        expect(isUuid(movementFound.UUID)).toBe(true);
        expect(isUuid(movementFound.accountId)).toBe(true);
        expect(movementFound.type).toBe('credit');
        expect(movementFound.value).toBe(100);
    });
});
