import { ApiKey, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const ApiKeyModel: PrismaClient['apiKey'] = prisma.apiKey;

export default ApiKeyModel;

export type ApiKeyResult = ApiKey;
