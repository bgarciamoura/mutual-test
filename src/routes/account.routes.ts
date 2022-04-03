import express from 'express';
import { uuid } from 'uuidv4';
import { Account } from '../entities/Account';
import { IAccount } from '../interfaces/Account';
import { validateCPF } from '../middlewares/validateCPF';

const accountsRoutes = express.Router();

accountsRoutes.post('/accounts', validateCPF, async (req, res) => {
    const { cpf, name } = req.body;

    const sanitizedCPF = cpf.replace(/[^\d]+/g, '');

    const account: IAccount = new Account();

    account.UUID = uuid();
    account.cpf = sanitizedCPF;
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
