// source/prisma.config.js
import "dotenv/config";
import { defineConfig, env } from "prisma/config"; // Importa 'env' de aquí

export default defineConfig({
  schema: "source/prisma/schema.prisma", // Nueva ruta relativa desde la raíz
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"), // Usa env() en lugar de process.env
  },
});