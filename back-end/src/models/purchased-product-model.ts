import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const PurchasedProductModel: PrismaClient['purchasedProduct'] =
  prisma.purchasedProduct;

export default PurchasedProductModel;
