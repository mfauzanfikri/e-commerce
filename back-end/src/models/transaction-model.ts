import { PrismaClient, Transaction } from '@prisma/client';
import { UserResource } from './user-model';

const prisma = new PrismaClient();
const TransactionModel: PrismaClient['transaction'] = prisma.transaction;

export type TransactionResource = {
  id: number;
  refNo: string;
  user: UserResource;
  grossAmount: number;
  totalPrice: number;
  createdAt: Date;
};

export type TransactionPostData = {
  refNo: string;
  userId: number;
  grossAmount: number;
  totalPrice: number;
};

export type TransactionPutData = {
  refNo?: string;
  grossAmount?: number;
  totalPrice?: number;
};

export type TransactionResult = Transaction;

export default TransactionModel;
