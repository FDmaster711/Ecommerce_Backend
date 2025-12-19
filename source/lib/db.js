// source/lib/db.js
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Configuración del pool de conexiones para Postgres
const pool = new pg.Pool({ 
    connectionString: process.env.DATABASE_URL 
});
const adapter = new PrismaPg(pool);

// Instanciamos el cliente usando el adaptador (Requerido en Prisma 7)
const prisma = new PrismaClient({ adapter });

export default prisma;