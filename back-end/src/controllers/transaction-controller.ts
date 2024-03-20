import { Request, Response } from 'express';
import TransactionModel, {
  TransactionPostData,
  TransactionPutData,
  TransactionResource,
  TransactionResult,
} from '../models/transaction-model';
import {
  createErrorResponse,
  createInternalServerErrorResponse,
  createSuccessResponse,
  sendJsonResponse,
} from '../services/response-service';
import { HTTP_RESPONSE_CODE } from '../constants';
import { sendInternalServerErrorResponse } from '../services/response-service/send-response';
import UserModel from '../models/user-model';
import RoleModel from '../models/role-model';

const model = TransactionModel;
const statusCode = HTTP_RESPONSE_CODE;

const createTransactionResource = async (
  transaction: TransactionResult
): Promise<TransactionResource | undefined> => {
  try {
    const user = await UserModel.findFirst({
      where: { id: transaction.userId },
    });

    if (user) {
      try {
        const role = await RoleModel.findFirst({ where: { id: user.roleId } });

        if (role) {
          return {
            ...transaction,
            user: {
              id: user.id,
              username: user.username,
              roleId: user.roleId,
              role: role.name,
            },
          };
        }
      } catch (error) {
        throw Error('DB connection error');
      }
    }
  } catch (error) {
    throw Error('DB connection error');
  }
};

const TransactionController = {
  get: async (_: Request, res: Response) => {
    try {
      const transactions = await model.findMany();

      const transactionsResource: TransactionResource[] = [];

      transactions.forEach(async (tr) => {
        try {
          const resource = await createTransactionResource(tr);

          if (resource) {
            transactionsResource.push(resource);
          }
        } catch (error) {
          const response = createInternalServerErrorResponse();

          return sendJsonResponse(res, response);
        }
      });

      const response = createSuccessResponse({
        message: 'Transactions data fetched successfully',
        data: transactionsResource,
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
      const transaction = await model.findFirst({ where: { id: id } });

      if (transaction) {
        try {
          const transactionResource = await createTransactionResource(
            transaction
          );
          const response = createSuccessResponse({
            message: 'Transaction data fetched successfully',
            data: transactionResource,
          });

          return sendJsonResponse(res, response);
        } catch (error) {
          const response = createInternalServerErrorResponse();

          return sendJsonResponse(res, response);
        }
      }
    } catch (error) {
      const response = createInternalServerErrorResponse();

      return sendJsonResponse(res, response);
    }
  },

  getByUserId: async (req: Request, res: Response) => {
    let userId: number | undefined;

    try {
      userId = Number.parseInt(req.params.id);
    } catch (error) {
      const response = createErrorResponse({
        status: statusCode.clientError.unprocessableContent,
        message: 'id (number) param with required',
      });

      return sendJsonResponse(res, response);
    }

    if (!userId) {
      const response = createErrorResponse({
        status: statusCode.clientError.unprocessableContent,
        message: 'userId param with required',
      });

      return sendJsonResponse(res, response);
    }

    try {
      const transactions = await model.findMany({ where: { userId: userId } });

      const transactionsResource: TransactionResource[] = [];

      transactions.forEach(async (tr) => {
        try {
          const resource = await createTransactionResource(tr);

          if (resource) {
            transactionsResource.push(resource);
          }
        } catch (error) {
          const response = createInternalServerErrorResponse();

          return sendJsonResponse(res, response);
        }
      });

      const response = createSuccessResponse({
        message: 'Transactions data fetched successfully',
        data: transactionsResource,
      });

      return sendJsonResponse(res, response);
    } catch (error) {
      const response = createInternalServerErrorResponse();

      return sendJsonResponse(res, response);
    }
  },

  post: async (req: Request, res: Response) => {
    const postData: TransactionPostData = req.body.data;

    if (
      !postData ||
      !postData.refNo ||
      !postData.grossAmount ||
      !postData.totalPrice
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
          refNo: postData.refNo,
        },
      });

      if (isExist) {
        const response = createErrorResponse({
          status: statusCode.clientError.conflict,
          message: 'Transaction already exists',
        });

        return sendJsonResponse(res, response);
      }
    } catch (error) {
      return sendInternalServerErrorResponse(res);
    }

    try {
      const createdTransaction = await model.create({
        data: postData,
      });

      const response = createSuccessResponse({
        status: statusCode.success.created,
        message: 'Transaction created',
        data: createdTransaction,
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

    const putData: TransactionPutData = req.body.data;

    if (!id) {
      const response = createErrorResponse({
        status: statusCode.clientError.unprocessableContent,
        message: 'id field required',
      });

      return sendJsonResponse(res, response);
    }

    if (
      !putData ||
      (!putData.refNo && !putData.grossAmount && !putData.totalPrice)
    ) {
      const response = createErrorResponse({
        status: statusCode.clientError.unprocessableContent,
        message: 'Need atleast one data field',
      });

      return sendJsonResponse(res, response);
    }

    const updateData = {};

    for (const key in putData) {
      if (key !== 'refNo' && key !== 'grossAmount' && key !== 'totalPrice') {
        continue;
      }

      Object.assign(updateData, { [key]: putData[key] });
    }

    try {
      const updatedTransaction = await model.update({
        data: updateData as TransactionPutData,
        where: {
          id: id,
        },
      });

      const response = createSuccessResponse({
        status: statusCode.success.ok,
        message: 'Transaction updated',
        data: updatedTransaction,
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
          message: 'Transaction not found',
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
        message: 'Transaction deleted',
      });

      return sendJsonResponse(res, response);
    } catch (error) {
      return sendInternalServerErrorResponse(res);
    }
  },
};

export default TransactionController;
