import { ProductServices } from "../services/product.service.js";

const productServices = new ProductServices();

export class ProductController {
    constructor() { }

    getAll = async (req, res) => {
        try {
            const { message, status, data } = await productServices.getAll();
            return res.status(status).json({
                message,
                data
            });
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }
    }

    getById = async (req, res) => {
        try {
            const productId = req.params.id;
            const { message, status, data } = await productServices.getById(productId);
            return res.status(status).json({
                message,
                data
            });
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }
    }

    getBySlug = async (req, res) => {
        try {
            const { slug } = req.params;
            const { message, status, data } = await productServices.getBySlug(slug);
            return res.status(status).json({
                message,
                data
            });
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }
    }

    create = async (req, res) => {

        try {
            const productData = req.body;

            const { message, status, data } = await productServices.createProduct(productData);

            return res.status(status).json({
                message,
                data
            });
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }
    }

    update = async (req,res) => {
        try {
            const producId = req.params.id;
            const productData = req.body;
            const {message,status,data} = await productServices.update(producId,productData);
            return res.status(status).json({
                message,
                data
            });
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }
    }

    delete = async (req,res) => {
        try {
            const productId = req.params.id;
            const {message,status,data} = await productServices.delete(productId);
            return res.status(status).json({
                message,
                data
            });
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({message: 'Internal Server Error', error: err.message });
        }
    }

    updateStock = async (req,res) => {
    try {
        const productId = req.params.id;
        const {stock} = req.body;
        const {message,status,data} = await productServices.updateStock(productId,stock);
        return res.status(status).json({
            message,
            data
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({message: 'Internal Server Error', error: err.message});
    }
    }

}