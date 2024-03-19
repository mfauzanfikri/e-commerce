import { Request, Response } from 'express';
import CategoryModel from '../models/category-model';
import {
  createInternalServerErrorResponse,
  createSuccessResponse,
  sendJSONResponse,
} from '../services/response-service';

const model = CategoryModel;

const CategoryController = {
  get: async (_: Request, res: Response) => {
    try {
      const data = await model.findMany();

      const response = createSuccessResponse({
        message: 'Categories data fetched successfully',
        data,
      });

      sendJSONResponse(res, response);
    } catch (error) {
      const response = createInternalServerErrorResponse();

      sendJSONResponse(res, response);
    }
  },
  post: async (req: Request, res: Response) => {
    res.json({ data: 'data created' });
  },
  put: async (req: Request, res: Response) => {
    res.json({ data: 'data edited' });
  },
  delete: async (req: Request, res: Response) => {
    res.json({ data: 'data delete' });
  },
};

export default CategoryController;
