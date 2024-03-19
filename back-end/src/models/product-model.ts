import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const ProductModel: PrismaClient['product'] = prisma.product;

export default ProductModel;
