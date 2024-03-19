import { ErrorResponse, SuccessResponse } from '../../types/response-type';

type CreateSuccessResponseParams = {
  status?: number;
  message: string;
  data?: any;
};

/**
 *
 * @param params.status @default 200 OK
 *
 * @returns SuccessResponse object
 */
export const createSuccessResponse = ({
  status = 200,
  message,
  data,
}: CreateSuccessResponseParams): SuccessResponse => {
  return {
    success: true,
    status,
    message,
    data,
  };
};

type CreateErrorResponseParams = {
  status?: number;
  message: 'string';
};

/**
 *
 * @param params.status @default 400 Bad Request
 *
 * @returns ErrorResponse object
 */
export const createErrorResponse = ({
  status = 400,
  message,
}: CreateErrorResponseParams): ErrorResponse => {
  return {
    success: false,
    status,
    message,
  };
};

export const createInternalServerErrorResponse = (): ErrorResponse => {
  return {
    success: false,
    status: 500,
    message: '500 INTERNAL SERVER ERROR',
  };
};
