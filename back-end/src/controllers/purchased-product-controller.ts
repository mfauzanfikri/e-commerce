import { Request, Response } from 'express';
import PurchasedProductModel, {
  PurchasedProductPostData,
} from '../models/purchased-product-model';
import {
  createErrorResponse,
  createInternalServerErrorResponse,
  createSuccessResponse,
  sendJsonResponse,
} from '../services/response-service';
import { HTTP_RESPONSE_CODE } from '../constants';
import { sendInternalServerErrorResponse } from '../services/response-service/send-response';

const model = PurchasedProductModel;
const statusCode = HTTP_RESPONSE_CODE;

const PurchasedProductController = {
  get: async (_: Request, res: Response) => {
    try {
      const purchasedproducts = await model.findMany();

      const response = createSuccessResponse({
        message: 'PurchasedProducts data fetched successfully',
        data: purchasedproducts,
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
      const purchasedproduct = await model.findFirst({ where: { id: id } });

      const response = createSuccessResponse({
        message: 'PurchasedProduct data fetched successfully',
        data: purchasedproduct,
      });

      return sendJsonResponse(res, response);
    } catch (error) {
      const response = createInternalServerErrorResponse();

      return sendJsonResponse(res, response);
    }
  },
  getByTransactionId: async (req: Request, res: Response) => {
    let transactionId: number | undefined;

    try {
      transactionId = Number.parseInt(req.params.id);
    } catch (error) {
      const response = createErrorResponse({
        status: statusCode.clientError.unprocessableContent,
        message: 'id (number) param with required',
      });

      return sendJsonResponse(res, response);
    }

    if (!transactionId) {
      const response = createErrorResponse({
        status: statusCode.clientError.unprocessableContent,
        message: 'transactionId param with required',
      });

      return sendJsonResponse(res, response);
    }

    try {
      const purchasedproduct = await model.findFirst({
        where: { transactionId: transactionId },
      });

      const response = createSuccessResponse({
        message: 'PurchasedProduct data fetched successfully',
        data: purchasedproduct,
      });

      return sendJsonResponse(res, response);
    } catch (error) {
      const response = createInternalServerErrorResponse();

      return sendJsonResponse(res, response);
    }
  },

  post: async (req: Request, res: Response) => {
    const postData: PurchasedProductPostData = req.body.data;

    if (
      !postData ||
      !postData.productId ||
      !postData.transactionId ||
      !postData.quantity
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
          productId: postData.productId,
          transactionId: postData.transactionId,
        },
      });

      if (isExist) {
        const response = createErrorResponse({
          status: statusCode.clientError.conflict,
          message: 'PurchasedProduct already exists',
        });

        return sendJsonResponse(res, response);
      }
    } catch (error) {
      return sendInternalServerErrorResponse(res);
    }

    try {
      const createdPurchasedProduct = await model.create({
        data: postData,
      });

      const response = createSuccessResponse({
        status: statusCode.success.created,
        message: 'PurchasedProduct created',
        data: createdPurchasedProduct,
      });

      return sendJsonResponse(res, response);
    } catch (error) {
      return sendInternalServerErrorResponse(res);
    }
  },

  // put: async (req: Request, res: Response) => {
  //   const id: number =
  //     typeof req.body.id === 'number'
  //       ? req.body.id
  //       : Number.parseInt(req.body.id);
  //   const putData: PurchasedProductPutData = req.body.data;

  //   if (!id) {
  //     const response = createErrorResponse({
  //       status: statusCode.clientError.unprocessableContent,
  //       message: 'id field required',
  //     });

  //     return sendJsonResponse(res, response);
  //   }

  //   if (
  //     !putData ||
  //     (!putData.purchasedproductname && !putData.password && !putData.roleId)
  //   ) {
  //     const response = createErrorResponse({
  //       status: statusCode.clientError.unprocessableContent,
  //       message: 'Need atleast one data field',
  //     });

  //     return sendJsonResponse(res, response);
  //   }

  //   const updateData = {};

  //   for (const key in putData) {
  //     if (
  //       key !== 'purchasedproductname' &&
  //       key !== 'password' &&
  //       key !== 'roleId'
  //     ) {
  //       continue;
  //     }

  //     Object.assign(updateData, { [key]: putData[key] });
  //   }

  //   try {
  //     const updatedPurchasedProduct = await model.update({
  //       data: updateData as PurchasedProductPutData,
  //       where: {
  //         id: id,
  //       },
  //     });

  //     const response = createSuccessResponse({
  //       status: statusCode.success.ok,
  //       message: 'PurchasedProduct updated',
  //       data: updatedPurchasedProduct,
  //     });

  //     return sendJsonResponse(res, response);
  //   } catch (error) {
  //     return sendInternalServerErrorResponse(res);
  //   }
  // },

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
          message: 'PurchasedProduct not found',
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
        message: 'PurchasedProduct deleted',
      });

      return sendJsonResponse(res, response);
    } catch (error) {
      return sendInternalServerErrorResponse(res);
    }
  },
};

export default PurchasedProductController;
