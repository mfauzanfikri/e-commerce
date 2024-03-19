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
  name?: string;
};

export default CategoryModel;
