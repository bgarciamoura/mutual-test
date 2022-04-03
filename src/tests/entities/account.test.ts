import { uuid } from 'uuidv4';
import { Account } from '../../entities/Account';
import { IAccount } from '../../interfaces/Account';
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

describe('Account creation test', () => {
    it('can be created correctly', async () => {
        expect.assertions(5);

        const id = uuid();

        const account: IAccount = new Account();

        account.UUID = id;
        account.cpf = '12345678901';
        account.name = 'Test';
        account.created_at = new Date();

        await account.save();

        const accountFound = await Account.findOne({ UUID: id });

        console.log('accountFound: ', accountFound);

        expect(accountFound).toBeDefined();
        expect(accountFound).toBeInstanceOf(Account);
        expect(accountFound.UUID).toBe(id);
        expect(accountFound.cpf).toBe('12345678901');
        expect(accountFound.name).toBe('Test');
    });
});
