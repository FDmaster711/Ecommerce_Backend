import dotenv from 'dotenv';
import { Server } from './Server/server.js';

dotenv.config();
const port = process.env.PORT || process.env.API_PORT || 5800;

const server = new Server(port);

server.listen();
