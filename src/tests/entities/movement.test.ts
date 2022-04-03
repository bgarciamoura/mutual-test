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
        expect.assertions(5);

        const id = uuid();
        const accountId = uuid();

        const movement: IMovement = new Movement();

        movement.UUID = id;
        movement.accountId = accountId;
        movement.value = 100;
        movement.created_at = new Date();

        await movement.save();

        const movementFound = await Movement.findOne({ UUID: id });

        console.log('movementFound: ', movementFound);

        expect(movementFound).toBeDefined();
        expect(movementFound).toBeInstanceOf(Movement);
        expect(true).toBe(isUuid(movementFound.UUID));
        expect(true).toBe(isUuid(movementFound.accountId));
        expect(movementFound.value).toBe(100);
    });
});
