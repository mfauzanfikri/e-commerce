import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const CategoryModel: PrismaClient['category'] = prisma.category;

export default CategoryModel;
