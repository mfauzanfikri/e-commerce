import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import CategoryRouter from './routes/category.route';
import RoleRouter from './routes/role.route';
import UserRouter from './routes/user.route';
import ProductRouter from './routes/product.route';
import TransactionRouter from './routes/transaction.route';

dotenv.config();

const port = process.env.PORT || 3010;
const app: Express = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/roles', RoleRouter);
app.use('/users', UserRouter);
app.use('/categories', CategoryRouter);
app.use('/products', ProductRouter);
app.use('/transactions', TransactionRouter);
app.use('/purchased-products', TransactionRouter);

app.get('*', (_, res, next) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: 'Not found',
  });
});

app.listen(port, () => {
  console.log(`REST API listening on port ${port}`);
});
