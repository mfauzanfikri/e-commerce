import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const CategoryModel: PrismaClient['category'] = prisma.category;

export type CategoryResource = {
  id: number;
  name: string;
};

export type CategoryPostData = {
  name: string;
};

export type CategoryPutData = {
  id: number;
  name?: string;
};

export type CategoryDeleteData = {
  id: number;
};

export default CategoryModel;
