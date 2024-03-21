import express, { Router } from 'express';
import PurchasedProductController from '../controllers/purchased-product.controller';

const PurchasedProductRouter: Router = express.Router();
const controller = PurchasedProductController;

PurchasedProductRouter.get('/', controller.get);
PurchasedProductRouter.get('/:id', controller.getById);
PurchasedProductRouter.post('/', controller.post);
// PurchasedProductRouter.put('/', controller.put);
PurchasedProductRouter.delete('/', controller.delete);

export const purchasedproductRouteBaseUrl = `${process.env.BASE_URL}/purchasedproducts`;

export default PurchasedProductRouter;
