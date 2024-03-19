import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../types/response-type';

const handleNotFound = (
  err: ErrorResponse,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  if (!err) {
    res.status(404).json({
      success: false,
      status: 404,
      message: '404 NOT FOUND',
    });

    return;
  }

  res.status(err.status || 500).json(err);
};

export default handleNotFound;
