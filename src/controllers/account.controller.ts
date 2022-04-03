import { Request, Response } from 'express';
import { isUuid, uuid } from 'uuidv4';
import { Account } from '../entities/Account';
import { IAccount } from '../interfaces/Account';

class AccountController {
    public create = async (req: Request, res: Response) => {
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
            res.status(500).json({ error: 'Error on create account' });
        }
    };

    public findAll = async (req: Request, res: Response) => {
        try {
            const accounts = await Account.find();

            res.status(200).json(accounts);
        } catch (error) {
            console.log('ERROR ON GET ACCOUNTS: ', error);
            res.status(500).json({ error: 'Error on get accounts' });
        }
    };

    public findByUUID = async (req: Request, res: Response) => {
        const { uuid } = req.params;

        console.log('uuid: ', uuid);

        if (!uuid) {
            return res.status(400).json({ error: 'UUID is required' });
        }

        try {
            const account = await Account.findOne({ UUID: uuid });

            if (!account) {
                return res.status(404).json({ error: 'Account not found' });
            }

            res.status(200).json(account);
        } catch (error) {
            console.log('ERROR ON GET ACCOUNT: ', error);
            res.status(500).json({ error: 'Error on get account' });
        }
    };

    public update = async (req: Request, res: Response) => {
        const { name } = req.body;
        const { uuid } = req.params;

        if (!uuid || !isUuid(uuid)) {
            return res.status(400).json({ error: 'UUID is required or is not valid' });
        }

        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        try {
            const account = await Account.findOne({ UUID: uuid });

            if (!account) {
                return res.status(404).json({ error: 'Account not found' });
            }

            account.name = name;

            const updatedAccount = await account.save();

            res.status(200).json(updatedAccount);
        } catch (error) {
            console.log('ERROR ON UPDATE ACCOUNT: ', error);
            res.status(500).json({ error: 'Error on update account' });
        }
    };

    public delete = async (req: Request, res: Response) => {
        const { uuid } = req.params;

        if (!uuid || !isUuid(uuid)) {
            return res.status(400).json({ error: 'UUID is required or is not valid' });
        }

        try {
            const account = await Account.findOne({ UUID: uuid });

            if (!account) {
                return res.status(404).json({ error: 'Account not found' });
            }

            await account.remove();

            res.status(204).json({ message: 'Account deleted' });
        } catch (error) {
            console.log('ERROR ON DELETE ACCOUNT: ', error);
            res.status(500).json({ error: 'Error on delete account' });
        }
    };

    public getBalance = async (req: Request, res: Response) => {
        const { uuid } = req.params;

        if (!uuid || !isUuid(uuid)) {
            return res.status(400).json({ error: 'UUID is required or is not valid' });
        }

        try {
            const account = await Account.findOne({ UUID: uuid });

            if (!account) {
                return res.status(404).json({ error: 'Account not found' });
            }

            res.status(200).json({ balance: account.balance });
        } catch (error) {
            console.log('ERROR ON GET BALANCE: ', error);
            res.status(500).json({ error: 'Error on get balance' });
        }
    };
}

export { AccountController };
