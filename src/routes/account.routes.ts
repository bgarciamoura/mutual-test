import express from 'express';
import { isUuid, uuid } from 'uuidv4';
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

accountsRoutes.get('/accounts/:uuid', async (req, res) => {
    const { uuid } = req.params;

    console.log('uuid: ', uuid);

    if (!uuid) {
        return res.status(400).send({ error: 'UUID is required' });
    }

    try {
        const account = await Account.findOne({ UUID: uuid });

        if (!account) {
            return res.status(404).send({ error: 'Account not found' });
        }

        res.status(200).json(account);
    } catch (error) {
        console.log('ERROR ON GET ACCOUNT: ', error);
        res.status(500).send({ error: 'Error on get account' });
    }
});

accountsRoutes.put('/accounts/:uuid', async (req, res) => {
    const { name } = req.body;
    const { uuid } = req.params;

    if (!uuid || !isUuid(uuid)) {
        return res.status(400).send({ error: 'UUID is required or is not valid' });
    }

    if (!name) {
        return res.status(400).send({ error: 'Name is required' });
    }

    try {
        const account = await Account.findOne({ UUID: uuid });

        if (!account) {
            return res.status(404).send({ error: 'Account not found' });
        }

        account.name = name;

        const updatedAccount = await account.save();

        res.status(200).json(updatedAccount);
    } catch (error) {
        console.log('ERROR ON UPDATE ACCOUNT: ', error);
        res.status(500).send({ error: 'Error on update account' });
    }
});

accountsRoutes.delete('/accounts/:uuid', async (req, res) => {
    const { uuid } = req.params;

    if (!uuid || !isUuid(uuid)) {
        return res.status(400).send({ error: 'UUID is required or is not valid' });
    }

    try {
        const account = await Account.findOne({ UUID: uuid });

        if (!account) {
            return res.status(404).send({ error: 'Account not found' });
        }

        await account.remove();

        res.status(204).send({ message: 'Account deleted' });
    } catch (error) {
        console.log('ERROR ON DELETE ACCOUNT: ', error);
        res.status(500).send({ error: 'Error on delete account' });
    }
});

export { accountsRoutes };
