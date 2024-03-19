import { Response } from 'express';
import { ErrorResponse, SuccessResponse } from '../../types/response-type';

/**
 *
 * @param res Express Response
 * @param resData Data to be sent
 * @returns res.status(resData.status).json(resData) - This function returns res object with status and data in JSON format
 */
export const sendJSONResponse = (
  res: Response,
  resData: SuccessResponse | ErrorResponse
) => {
  return res.status(resData.status).json(resData);
};
