import express, { Router } from 'express';
import ProductController from '../controllers/product-controller';

const ProductRouter: Router = express.Router();
const controller = ProductController;

ProductRouter.get('/', controller.get);
ProductRouter.get('/:id', controller.getById);
ProductRouter.post('/', controller.post);
ProductRouter.put('/', controller.put);
ProductRouter.delete('/', controller.delete);

export const productRouteBaseUrl = `${process.env.BASE_URL}/products`;

export default ProductRouter;
