import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const UserModel: PrismaClient['user'] = prisma.user;

export default UserModel;
