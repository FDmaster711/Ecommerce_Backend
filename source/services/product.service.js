import prisma from "../lib/db.js";
import { generateSlug } from "../utils/slug.utils.js";

 export class ProductServices {

    constructor () {}
    
    getAll = async () => {
        try {
           const products = await prisma.product.findMany({
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
           });
           
           return {
                message : products.length === 0 ? "Products Not found" : "Products retrieved successfully",
                status: 200,
                data: {
                    products,
                    total: products.length
                }
           }

        } catch (err) {
            console.error(err.message);
            return {
                message: 'Internal Server Error',
                status: 500
            }
        }
    }

    getById = async (id) => {
        try {
            const product = await prisma.product.findUnique({
                where: {id},
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });
            return {
                message: product ? "Product retrieved successfully" : "Product Not found",
                status: product ? 200 : 404,
                data: product ? {product} : null
            }
        } catch(err){
            console.error(err.message);
            return {
                message: 'Internal Server Error',
                status: 500
            }
        }
    }

    getBySlug = async (slug) => {
        try {
            const product = await prisma.product.findUnique({
                where: {slug},
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });
            return {
                message: product ? "Product retrieved successfully" : "Product Not found",
                status: product ? 200 : 404,
                data: product ? {product} : null
            }
        } catch (err) {
            console.error(err.message);
            return {
                message: 'Internal Server Error',
                status: 500
            }
        }
    }

    createProduct = async (data) => {
        try {
           const slug = generateSlug(data.name);

            const newProduct = await prisma.product.create({
                data: {
                    ...data,
                    slug: slug
                }
            });
            return {
                message: "Product created successfully",
                status: 201,
                data: {product: newProduct}
            }
        } catch (err) {
            if (err.code === 'P2002') {
                return {
                    message: "Product with this slug already exists",
                    status: 400,
                    data: null
                }
            }

            console.error(err.message);

            return  {
                message: 'Internal Server Error',
                status: 500
            }
        }
    }

    updateProduct = async (id, data) => {
        try {
            const product = await prisma.product.update({
                where: {id},
                data
            });
            return {
                message: "Product updated successfully",
                status: 200,
                data: {product}
            }
        } catch (err) {
            if (err.code === 'P2025') {
                return {
                    message: "Product Not found",
                    status: 404,
                    data: null
                }
            }
            console.error(err.message);
            return {
                message: 'Internal Server Error',
                status: 500
            }
        }
    }

    deleteProduct = async (id) => {
    try {
        const product = await prisma.product.delete({
            where: {id}
        });
        return {
            message: "Product deleted successfully",
            status: 200,
            data: {product}
        }
    } catch (err) {
        if (err.code === 'P2025') {
            return {
                message: "Product Not found",
                status: 404,
                data: null
            }
        }
        console.error(err.message);
        return {
            message: 'Internal Server Error',
            status: 500
        }
    }
    
    }

    updateStock = async (id, stock) => {
        try {
           const product = await prisma.product.update({
                where: {id},
                data: {stock}
           });

           return {
            message: "Product stock updated successfully",
            status: 200,
            data: {product}
           }

        } catch (err) {
            if (err.code === 'P2025') {
                return {
                    message: "Product Not found",
                    status: 404,
                    data: null
                }
            }

            console.error(err.message);
            return {
                message: 'Internal Server Error',
                status: 500
            }
        }
    }
   
}

