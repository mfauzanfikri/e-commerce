import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { ErrorResponse } from './types/response-type';
import handleNotFound from './middlewares/handle-not-found-middleware.ts';
import CategoryController from './controllers/category-controller';
import CategoryRouter from './routes/category-route';

dotenv.config();

const port = process.env.PORT;
const app: Express = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/categories', CategoryRouter);

app.get('*', (_, __, next) => {
  const err: ErrorResponse = {
    success: false,
    status: 404,
    message: '404 NOT FOUND',
  };

  next(err);
});

app.use(handleNotFound);

app.listen(port, () => {
  console.log(`REST API listening on port ${port}`);
});
