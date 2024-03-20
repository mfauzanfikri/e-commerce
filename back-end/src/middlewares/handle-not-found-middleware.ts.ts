import { NextFunction, Request, Response } from 'express';

const handleNotFound = (_: Request, res: Response, __: NextFunction) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: 'Not found',
  });
};

export default handleNotFound;
