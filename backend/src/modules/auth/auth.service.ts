import { prisma } from "../../config/db";
import { hashPassword, comparePassword } from "../../utils/password";
import { signJwt } from "../../utils/jwt";
import { RegisterDto, LoginDto } from "./auth.types";

export async function registerUser(dto: RegisterDto) {
  const existing = await prisma.user.findUnique({ where: { email: dto.email } });
  if (existing) {
    const err: any = new Error("User with this email already exists");
    err.status = 409;
    throw err;
  }

  const hashed = await hashPassword(dto.password);

  const user = await prisma.user.create({
    data: {
      email: dto.email,
      password: hashed,
      firstName: dto.firstName,
      lastName: dto.lastName
    }
  });

  const token = signJwt({ userId: user.id, email: user.email });
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    }
  };
}

export async function loginUser(dto: LoginDto) {
  const user = await prisma.user.findUnique({ where: { email: dto.email } });
  if (!user) {
    const err: any = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const valid = await comparePassword(dto.password, user.password);
  if (!valid) {
    const err: any = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }

  const token = signJwt({ userId: user.id, email: user.email });
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    }
  };
}
