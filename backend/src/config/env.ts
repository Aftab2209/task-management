import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.string().optional(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  JWT_SECRET: z.string().min(10),
  JWT_EXPIRES_IN: z.string().default("1h"),
  BCRYPT_SALT_ROUNDS: z
    .string()
    .optional()
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Invalid environment variables:", _env.error.format());
  process.exit(1);
}

export const env = {
  DATABASE_URL: _env.data.DATABASE_URL,
  PORT: Number(process.env.PORT || 4000),
  NODE_ENV: _env.data.NODE_ENV,
  JWT_SECRET: _env.data.JWT_SECRET,
  JWT_EXPIRES_IN: _env.data.JWT_EXPIRES_IN,
  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS || 12)
};
