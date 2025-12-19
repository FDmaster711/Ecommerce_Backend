import prisma from "../lib/db.js";

 export class ProductServices {

    constructor () {}

    getAll = async () => {
      try {
        const products = await prisma.product.findMany({});
        if (products.length === 0) {
            return {
                message: "Products Not found",
                status: 404,
                data: {
                    products: [],
                    total: 0
                },
            };

        }
            return {
            message: "Products retrieved successfully",
            status: 200,
            data: {
                products,
                total: products.length
            },
        };    
        }catch(err) {
            console.error(err.message);
            return {
                message: 'Internal Server Error',
                status: 500,
            };
        }   
    } 
}

