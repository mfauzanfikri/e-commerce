import { PrismaClient, PurchasedProduct } from '@prisma/client';
import { ProductResource } from './product-model';
import { TransactionResource } from './transaction-model';

const prisma = new PrismaClient();
const PurchasedProductModel: PrismaClient['purchasedProduct'] =
  prisma.purchasedProduct;

export type PurchasedProductResource = {
  id: number;
  product: ProductResource;
  transaction: TransactionResource;
  quantity: number;
};

export type PurchasedProductPostData = {
  productId: number;
  transactionId: number;
  quantity: number;
};

// export type PurchasedProductPutData = {
//   productId?: number;
//   transactionId?: number;
//   quantity?: number;
// };

export type PurchasedProductResult = PurchasedProduct;

export default PurchasedProductModel;
