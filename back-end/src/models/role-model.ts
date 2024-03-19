import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const RoleModel: PrismaClient['role'] = prisma.role;

export default RoleModel;
