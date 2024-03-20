import { generateApiKey as generator } from 'generate-api-key';
import { encryptKey } from './api-auth';
import { randomBytes } from 'crypto';

export const generateApiKey = (name?: string) => {
  const key = generator({
    method: 'uuidv5',
    name: name || randomBytes(10).toString('hex'),
    batch: 1,
  }).toString();

  const hash = encryptKey(key);

  return { key, hash };
};
