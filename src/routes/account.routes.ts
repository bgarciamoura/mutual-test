import express from 'express';
import { AccountController } from '../controllers/account.controller';
import { validateCPF } from '../middlewares/validateCPF';

const accountsRoutes = express.Router();
const accountController = new AccountController();

accountsRoutes.post('/accounts', validateCPF, accountController.create);

accountsRoutes.get('/accounts', accountController.findAll);

accountsRoutes.get('/accounts/:uuid', accountController.findByUUID);

accountsRoutes.put('/accounts/:uuid', accountController.update);

accountsRoutes.delete('/accounts/:uuid', accountController.delete);

accountsRoutes.get('/accounts/:uuid/balance', accountController.getBalance);

export { accountsRoutes };
