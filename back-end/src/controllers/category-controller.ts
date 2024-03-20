import { Request, Response } from 'express';
import CategoryModel, {
  CategoryPostData,
  CategoryPutData,
} from '../models/category-model';
import {
  createErrorResponse,
  createInternalServerErrorResponse,
  createSuccessResponse,
  sendJsonResponse,
} from '../services/response-service';
import { HTTP_RESPONSE_CODE } from '../constants';
import { sendInternalServerErrorResponse } from '../services/response-service/send-response';

const model = CategoryModel;
const statusCode = HTTP_RESPONSE_CODE;

const CategoryController = {
  get: async (_: Request, res: Response) => {
    try {
      const categories = await model.findMany();

      const response = createSuccessResponse({
        message: 'Categories data fetched successfully',
        data: categories,
      });

      return sendJsonResponse(res, response);
    } catch (error) {
      const response = createInternalServerErrorResponse();

      return sendJsonResponse(res, response);
    }
  },

  getById: async (req: Request, res: Response) => {
    let id: number | undefined;

    try {
      id = Number.parseInt(req.params.id);
    } catch (error) {
      const response = createErrorResponse({
        status: statusCode.clientError.unprocessableContent,
        message: 'id (number) param with required',
      });

      return sendJsonResponse(res, response);
    }

    if (!id) {
      const response = createErrorResponse({
        status: statusCode.clientError.unprocessableContent,
        message: 'id param with required',
      });

      return sendJsonResponse(res, response);
    }

    try {
      const categories = await model.findFirst({ where: { id: id } });

      const response = createSuccessResponse({
        message: 'Category data fetched successfully',
        data: categories,
      });

      return sendJsonResponse(res, response);
    } catch (error) {
      const response = createInternalServerErrorResponse();

      return sendJsonResponse(res, response);
    }
  },

  post: async (req: Request, res: Response) => {
    const postData: CategoryPostData = req.body.data;

    if (!postData || !postData.name) {
      const response = createErrorResponse({
        status: statusCode.clientError.unprocessableContent,
        message: 'Missing one or more fields',
      });

      return sendJsonResponse(res, response);
    }

    try {
      const isExist = await model.findFirst({
        where: {
          name: postData.name,
        },
      });

      if (isExist) {
        const response = createErrorResponse({
          status: statusCode.clientError.conflict,
          message: 'Category already exists',
        });

        return sendJsonResponse(res, response);
      }
    } catch (error) {
      return sendInternalServerErrorResponse(res);
    }

    try {
      const createdCategory = await model.create({
        data: postData,
      });

      const response = createSuccessResponse({
        status: statusCode.success.created,
        message: 'Category created',
        data: createdCategory,
      });

      return sendJsonResponse(res, response);
    } catch (error) {
      return sendInternalServerErrorResponse(res);
    }
  },

  put: async (req: Request, res: Response) => {
    const id: number =
      typeof req.body.id === 'number'
        ? req.body.id
        : Number.parseInt(req.body.id);

    const putData: CategoryPutData = req.body.data;

    if (!id) {
      const response = createErrorResponse({
        status: statusCode.clientError.unprocessableContent,
        message: 'id field required',
      });

      return sendJsonResponse(res, response);
    }

    if (!putData || !putData.name) {
      const response = createErrorResponse({
        status: statusCode.clientError.unprocessableContent,
        message: 'Need atleast one data field',
      });

      return sendJsonResponse(res, response);
    }

    const updateData = {};

    for (const key in putData) {
      if (key !== 'name') {
        continue;
      }

      Object.assign(updateData, { [key]: putData[key] });
    }

    try {
      const updatedCategory = await model.update({
        data: updateData as CategoryPutData,
        where: {
          id: id,
        },
      });

      const response = createSuccessResponse({
        status: statusCode.success.ok,
        message: 'Category updated',
        data: updatedCategory,
      });

      return sendJsonResponse(res, response);
    } catch (error) {
      return sendInternalServerErrorResponse(res);
    }
  },

  delete: async (req: Request, res: Response) => {
    const id: number =
      typeof req.body.id === 'number'
        ? req.body.id
        : Number.parseInt(req.body.id);

    if (!id) {
      const response = createErrorResponse({
        status: statusCode.clientError.unprocessableContent,
        message: 'id field missing',
      });

      return sendJsonResponse(res, response);
    }

    try {
      const isExist = await model.findFirst({
        where: {
          id: id,
        },
      });

      if (isExist) {
        const response = createErrorResponse({
          status: statusCode.clientError.notFound,
          message: 'Category not found',
        });

        return sendJsonResponse(res, response);
      }
    } catch (error) {
      return sendInternalServerErrorResponse(res);
    }

    try {
      await model.delete({ where: { id: id } });

      const response = createSuccessResponse({
        status: statusCode.success.noContent,
        message: 'Category deleted',
      });

      return sendJsonResponse(res, response);
    } catch (error) {
      return sendInternalServerErrorResponse(res);
    }
  },
};

export default CategoryController;
