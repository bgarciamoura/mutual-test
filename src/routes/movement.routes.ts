import express from 'express';
import { MovementController } from '../controllers/movement.controller';

const movementRoutes = express.Router();
const movementController = new MovementController();

movementRoutes.post('/movement/credit', movementController.credit);
movementRoutes.post('/movement/debit', movementController.debit);
movementRoutes.post('/movement/transfer', movementController.transfer);

export { movementRoutes };
