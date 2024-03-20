import { createCipheriv, createDecipheriv } from 'crypto';
import ApiKeyModel, { ApiKeyResult } from '../../models/api-key-model';

const algorithm = process.env.API_KEY_ALGORITHM as string;
const secretKey = process.env.API_KEY_SECRET as string;
const iv = process.env.API_KEY_IV as string;
const model = ApiKeyModel;

export const authKey = async (
  clientKey: string
): Promise<ApiKeyResult | boolean> => {
  const key = await model
    .findFirst({
      where: {
        key: { equals: encryptKey(clientKey) },
      },
    })
    .catch(() => {
      return false;
    });

  if (!key) {
    return false;
  }

  return key;
};

export const encryptKey = (key: string) => {
  const cipher = createCipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));

  const encrypted = Buffer.concat([cipher.update(key), cipher.final()]);

  return encrypted.toString('hex');
};

export const decryptKey = (hash: string) => {
  const decipher = createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(iv, 'hex')
  );

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash, 'hex')),
    decipher.final(),
  ]);

  return decrypted.toString();
};

const apiService = { authKey, encryptKey, decryptKey };

export default apiService;
