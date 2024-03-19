import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { ErrorResponse } from './types/response-type';
import handleNotFound from './middlewares/handle-not-found-middleware.ts';

dotenv.config();

const port = process.env.PORT;
const app: Express = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('*', (_, __, next) => {
  const err: ErrorResponse = {
    status: 404,
    message: '404 NOT FOUND',
  };
  next(err);
});

app.use(handleNotFound);

app.listen(port, () => {
  console.log(`REST API listening on port ${port}`);
});
