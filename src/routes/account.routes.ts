import express from 'express';
import { uuid } from 'uuidv4';
import { Account } from '../entities/Account';
import { IAccount } from '../interfaces/Account';

const accountsRoutes = express.Router();

accountsRoutes.post('/accounts', async (req, res) => {
    const { cpf, name } = req.body;

    const account: IAccount = new Account();

    account.UUID = uuid();
    account.cpf = cpf;
    account.name = name;

    try {
        const savedAccount = await account.save();

        res.status(201).json(savedAccount);
    } catch (error) {
        console.log('ERROR ON CREATE ACCOUNT: ', error);
        res.status(500).send({ error: 'Error on create account' });
    }
});

accountsRoutes.get('/accounts', async (req, res) => {
    try {
        const accounts = await Account.find();

        res.status(200).json(accounts);
    } catch (error) {
        console.log('ERROR ON GET ACCOUNTS: ', error);
        res.status(500).send({ error: 'Error on get accounts' });
    }
});

export { accountsRoutes };
