import { Request, Response } from 'express';
import { isUuid, uuid } from 'uuidv4';
import { Movement } from '../entities/Movement';
import { IMovement } from '../interfaces/Movement';
import { Account } from '../entities/Account';
import { IAccount } from '../interfaces/Account';

class MovementController {
    public credit = async (req: Request, res: Response) => {
        const { accountId, value } = req.body;

        const updatedAccount = await this.updateAccountBalance(accountId, value, 'credit');

        if (updatedAccount) {
            const movement: IMovement = new Movement();

            movement.UUID = uuid();
            movement.accountId = updatedAccount.UUID;
            movement.value = value;
            movement.type = 'credit';

            try {
                const savedMovement = await this.createMovement(movement);

                res.status(201).json({ savedMovement, accountBalance: updatedAccount.balance });
            } catch (error) {
                console.log('ERROR ON CREDIT: ', error);
                res.status(500).json({ error: 'Error on credit' });
            }
        } else {
            res.status(500).json({ error: 'Error on credit, account not found' });
        }
    };

    public debit = async (req: Request, res: Response) => {
        const { accountId, value } = req.body;

        const updatedAccount = await this.updateAccountBalance(accountId, value, 'debit');

        if (updatedAccount) {
            const movement: IMovement = new Movement();

            movement.UUID = uuid();
            movement.accountId = updatedAccount.UUID;
            movement.value = value;
            movement.type = 'debit';

            try {
                const savedMovement = await movement.save();

                res.status(201).json({ savedMovement, accountBalance: updatedAccount.balance });
            } catch (error) {
                console.log('ERROR ON DEBIT: ', error);
                res.status(500).json({ error: 'Error on debit' });
            }
        } else {
            res.status(500).json({ error: 'Error on debit, account not found or insuficient funds' });
        }
    };

    public transfer = async (req: Request, res: Response) => {
        const { accountId, value, targetAccountId } = req.body;

        try {
            const updatedAccount = await this.updateAccountBalance(accountId, value, 'debit');

            if (updatedAccount) {
                const debitMovement: IMovement = new Movement();

                debitMovement.UUID = uuid();
                debitMovement.accountId = accountId;
                debitMovement.value = value;
                debitMovement.type = 'debit';

                await this.createMovement(debitMovement);

                const updatedTargetAccount = await this.updateAccountBalance(
                    targetAccountId,
                    value,
                    'credit'
                );

                if (updatedTargetAccount) {
                    const creditMovement: IMovement = new Movement();

                    creditMovement.UUID = uuid();
                    creditMovement.accountId = accountId;
                    creditMovement.value = value;
                    creditMovement.type = 'credit';

                    await this.createMovement(creditMovement);

                    res.status(201).json({
                        debitMovement,
                        creditMovement,
                        accountBalance: updatedAccount.balance,
                        targetAccountBalance: updatedTargetAccount.balance,
                    });
                } else {
                    res.status(500).json({ error: 'Error on transfer, target account not found' });
                }
            } else {
                res.status(500).json({ error: 'Error on debit, account not found or insuficient funds' });
            }
        } catch (error) {
            console.log('ERROR ON TRANSFER: ', error);
            res.status(500).json({ error: 'Error on transfer' });
        }
    };

    private updateAccountBalance = async (
        accountId: string,
        value: string,
        type: string
    ): Promise<null | IAccount> => {
        const account = await Account.findOne({ UUID: accountId });

        if (!account) {
            return null;
        }

        if (type === 'debit' && account.balance < parseFloat(value)) {
            return null;
        }

        type === 'credit' ? (account.balance += parseFloat(value)) : (account.balance -= parseFloat(value));

        const updatedAccount = await account.save();

        return updatedAccount;
    };

    private createMovement = async (movement: IMovement): Promise<IMovement> => {
        const savedMovement = await movement.save();

        return savedMovement;
    };
}

export { MovementController };
