import bcrypt from "bcrypt";
import { env } from "../config/env";

export async function hashPassword(plain: string): Promise<string> {
  const saltRounds = env.BCRYPT_SALT_ROUNDS;
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(plain, salt);
}

export async function comparePassword(plain: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}
