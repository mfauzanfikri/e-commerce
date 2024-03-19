import express, { Router } from 'express';
import Controller from '../controllers/category-controller';

const CategoryRouter: Router = express.Router();
const controller = Controller;

CategoryRouter.get('/', controller.get);

CategoryRouter.post('/', controller.post);

CategoryRouter.put('/', controller.put);

CategoryRouter.delete('/', controller.delete);

export default CategoryRouter;
