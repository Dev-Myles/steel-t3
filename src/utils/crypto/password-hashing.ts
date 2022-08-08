import crypto, { BinaryLike } from 'crypto';
import util from 'util';

const scrypt = util.promisify(crypto.scrypt);

export async function encryptPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(8).toString('hex');
  const buffer: unknown = await scrypt(password, salt, 64);
  const hashedPassword =
    buffer instanceof Buffer ? buffer.toString('hex') : null;
  return `${hashedPassword}.${salt}`;
}

export async function decryptPassword(
  attemptPassword: string,
  realPassword: string
): Promise<boolean> {
  const [hashed, salt] = realPassword.split('.');
  const buffer: unknown = await scrypt(attemptPassword, salt as BinaryLike, 64);
  const hashedAttemptPassword =
    buffer instanceof Buffer ? buffer.toString('hex') : null;
  const matchPassword = hashed === hashedAttemptPassword;
  return matchPassword;
}
