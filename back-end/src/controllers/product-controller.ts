import { Request, Response } from 'express';

const ProductController = {
  get: (req: Request, res: Response) => {
    res.json({ data: 'data' });
  },
  post: (req: Request, res: Response) => {
    res.json({ data: 'data created' });
  },
  put: (req: Request, res: Response) => {
    res.json({ data: 'data edited' });
  },
  delete: (req: Request, res: Response) => {
    res.json({ data: 'data delete' });
  },
};

export default ProductController;
