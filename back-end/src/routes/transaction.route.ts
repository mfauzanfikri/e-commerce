import express, { Router } from 'express';
import TransactionController from '../controllers/transaction.controller';

const TransactionRouter: Router = express.Router();
const controller = TransactionController;

TransactionRouter.get('/', controller.get);
TransactionRouter.get('/:id', controller.getById);
TransactionRouter.post('/', controller.post);
TransactionRouter.put('/', controller.put);
TransactionRouter.delete('/', controller.delete);

export const transactionRouteBaseUrl = `${process.env.BASE_URL}/transactions`;

export default TransactionRouter;
