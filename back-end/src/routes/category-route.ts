import express, { Router } from 'express';
import Controller from '../controllers/category-controller';

const CategoryRouter: Router = express.Router();
const controller = Controller;

CategoryRouter.get('/', controller.get);
CategoryRouter.get('/:id', controller.getById);
CategoryRouter.post('/', controller.post);
CategoryRouter.put('/', controller.put);
CategoryRouter.delete('/', controller.delete);

export const categoryRouteBaseUrl = `${process.env.BASE_URL}/categories`;

export default CategoryRouter;
