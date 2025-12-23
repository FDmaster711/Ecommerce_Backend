import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from '../routes/products.routes.js';
import categoryRoutes from '../routes/category.routes.js';
import authRoutes from '../routes/auth.routes.js';
import userRoutes from '../routes/user.routes.js';
import orderRoutes from '../routes/order.routes.js';

dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Server {
    app;
    port;

    constructor(port) {
        this.app = express();
        this.port = port;
        this.pre = '/api';
        this.middlewares();

        this.rutas = {
            products:`${this.pre}/products`,
            categories: `${this.pre}/categories`,
            auth: `${this.pre}/auth`,
            users: `${this.pre}/users`,
            orders: `${this.pre}/orders`
        };

        this.routes();
        
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname, '../public')));
    }

    routes = () => {
        this.app.use(this.rutas.products,productRoutes);
        this.app.use(this.rutas.categories,categoryRoutes);
        this.app.use(this.rutas.auth,authRoutes);
        this.app.use(this.rutas.users,userRoutes);
        this.app.use(this.rutas.orders,orderRoutes);
    }

    listen = () => {
        this.app.listen(this.port, () => {
            console.log(`Server running at http://localhost:${this.port}`)
        })
    }
}