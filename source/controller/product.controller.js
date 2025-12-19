import { ProductServices } from "../services/product.service.js";

const productServices = new ProductServices();

export class ProductController {
    constructor () {}

    getAll = async (req,res) => {
        const {message,status,data} = await productServices.getAll();
        
        return res.status(status).json({
            message,
            data
        });
    };
}