import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const TransactionModel: PrismaClient['transaction'] = prisma.transaction;

export default TransactionModel;
