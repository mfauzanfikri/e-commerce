import { Product, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const ProductModel: PrismaClient['product'] = prisma.product;

export type ProductResource = {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  category: string;
  stock: number;
  active: boolean;
  createdAt: Date;
};

export type ProductPostData = {
  name: string;
  price: number;
  categoryId: number;
  stock: number;
  active?: boolean;
};

export type ProductPutData = {
  name?: string;
  price?: number;
  categoryId?: number;
  stock?: number;
  active?: boolean;
};

export type ProductResult = Product;

export default ProductModel;
