import { Request, Response } from 'express';
import ProductModel, {
  ProductPostData,
  ProductPutData,
  ProductResource,
  ProductResult,
} from '../models/product-model';
import {
  createErrorResponse,
  createInternalServerErrorResponse,
  createSuccessResponse,
  sendJsonResponse,
} from '../services/response-service';
import { HTTP_RESPONSE_CODE } from '../constants';
import { sendInternalServerErrorResponse } from '../services/response-service/send-response';

const model = ProductModel;
const statusCode = HTTP_RESPONSE_CODE;

const ProductController = {
  get: async (_: Request, res: Response) => {
    try {
      const users = await model.findMany();

      const response = createSuccessResponse({
        message: 'Products data fetched successfully',
        data: users,
      });

      sendJsonResponse(res, response);
    } catch (error) {
      const response = createInternalServerErrorResponse();

      sendJsonResponse(res, response);
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
      const users = await model.findFirst({ where: { id: id } });

      const response = createSuccessResponse({
        message: 'Product data fetched successfully',
        data: users,
      });

      return sendJsonResponse(res, response);
    } catch (error) {
      const response = createInternalServerErrorResponse();

      return sendJsonResponse(res, response);
    }
  },

  post: async (req: Request, res: Response) => {
    const postData: ProductPostData = req.body.data;

    if (
      !postData ||
      !postData.name ||
      !postData.price ||
      !postData.stock ||
      !postData.categoryId
    ) {
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
          message: 'Product already exists',
        });

        return sendJsonResponse(res, response);
      }
    } catch (error) {
      return sendInternalServerErrorResponse(res);
    }

    try {
      const createdProduct = await model.create({
        data: postData,
      });

      const response = createSuccessResponse({
        status: statusCode.success.created,
        message: 'Product created',
        data: createdProduct,
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

    const putData: ProductPutData = req.body.data;

    if (!id) {
      const response = createErrorResponse({
        status: statusCode.clientError.unprocessableContent,
        message: 'id field required',
      });

      return sendJsonResponse(res, response);
    }

    if (
      !putData ||
      (!putData.name && !putData.price && !putData.stock && !putData.categoryId)
    ) {
      const response = createErrorResponse({
        status: statusCode.clientError.unprocessableContent,
        message: 'Need atleast one data field',
      });

      return sendJsonResponse(res, response);
    }

    const updateData = {};

    for (const key in putData) {
      if (
        key !== 'name' &&
        key !== 'price' &&
        key !== 'stock' &&
        key !== 'categoryId' &&
        key !== 'active'
      ) {
        continue;
      }

      Object.assign(updateData, { [key]: putData[key] });
    }

    try {
      const updatedProduct = await model.update({
        data: updateData as ProductPutData,
        where: {
          id: id,
        },
      });

      const response = createSuccessResponse({
        status: statusCode.success.ok,
        message: 'Product updated',
        data: updatedProduct,
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
          message: 'Product not found',
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
        message: 'Product deleted',
      });

      return sendJsonResponse(res, response);
    } catch (error) {
      return sendInternalServerErrorResponse(res);
    }
  },
};

export default ProductController;
