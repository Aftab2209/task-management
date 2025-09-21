import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

export interface JwtPayloadCustom {
  userId: string;
  email: string;
}

export function signJwt(
  payload: JwtPayloadCustom,
  expiresIn?: string | number
): string {
  const options: SignOptions = {

    expiresIn: (expiresIn ?? env.JWT_EXPIRES_IN) as SignOptions['expiresIn'],
  };

  return jwt.sign(payload, env.JWT_SECRET as jwt.Secret, options);
}

export function verifyJwt<T = JwtPayloadCustom>(token: string): T {
  return jwt.verify(token, env.JWT_SECRET as jwt.Secret) as T;
}
