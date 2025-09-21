// src/server.ts
import { app } from "./app";
import { env } from "./config/env";
import { prisma } from "./config/db";

const server = app.listen(env.PORT, () => {
  console.log(`running on port ${env.PORT}`);
});

const shutdown = async () => {
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });

 
  setTimeout(() => {
    process.exit(1);
  }, 10000).unref();
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
