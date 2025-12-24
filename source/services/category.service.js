import prisma from "../lib/db.js";

export class CategoryServices {
    constructor() { }

    getAll = async () => {
        try {
            const categories = await prisma.category.findMany({});
            return {
                message: categories.length === 0 ? "Categories Not found" : "Categories retrieved successfully",
                status: 200,
                data: {
                    categories,
                    total: categories.length
                }
            }
        } catch (err) {
            console.error(err.message);
            return {
                message: 'Internal Server Error',
                status: 500,
            }
        }
    }

    getById = async (id) => {
        try {
            const category = await prisma.category.findUnique({
                where: {id}
            })
            if (!category) {
                return {
                    message: "Category Not found",
                    status: 404,
                    data: null
                }
            }
            return {
                message: "Category retrieved successfully",
                status: 200,
                data: {
                    category
                }
            }
        } catch (err) {
            
            console.error(err.message);
            return {
                message: 'Internal Server Error',
                status: 500,
            }

        }
    }

    getByName = async (name) => {
        try {
            
            const category = await prisma.category.findFirst({
                where: {
                    name: {
                        equals: name,
                        mode: 'insensitive'
                    }

                }
            })
            if (!category) {
                return {
                    message: "Category Not found",
                    status: 404,
                    data: null
                }
            }
            return {
                message: "Category retrieved successfully",
                status: 200,
                data: {
                    category
                }
            }
        } catch (err) {
            console.error(err.message);
            return {
                message: 'Internal Server Error',
                status: 500,
            }
        }
    }

    create = async ({ name, description }) => {
        try {
            const newCategory = await prisma.category.create({
                data: {
                    name,
                    description
                }
            })
            return {
                message: "Category created successfully",
                status: 201,
                data: {
                    category: newCategory
                }
            }
        } catch (err) {

            if (err.code === 'P2002') {
                return {
                    message: "A category with this name already exists",
                    status: 400,
                };
            }
            console.error(err.message);
            return {
                message: 'Internal Server Error',
                status: 500,
            }
        }
    }

    update = async (id, { name,description})  => {
        try {
            const updatedCategory = await prisma.category.update({
                where: { id},
                data: { name,description}
            })
           return {
                message: "Category updated successfully",
                status: 200,
                data: {
                    category: updatedCategory
                }
            } 
        } catch (err) {
            
            if(err.code === 'P2025') {
                return {
                    message: "Category Not found",
                    status: 404,
                    data: null
                };
            }

            if(err.code === 'P2002') {
                return {
                    message: "A category with this name already exists",
                    status: 400,
                };
            }

            console.error(err.message);
            return {
                message: 'Internal Server Error',
                status: 500,
                
           } 

        }
    }


    delete = async (id) => {
        try {
            const deletedCategory = await prisma.category.delete({
                where: { id}
            })
            return {
                message: "Category deleted successfully",
                status: 200,
                data: {
                    category: deletedCategory
                }
            }

        } catch (err) {
            console.error(err.message);
            if(err.code === 'P2025') {
                return {
                    message: "Category Not found",
                    status: 404,
                    data: null
                };
            }
            return {
                message: 'Internal Server Error',
                status: 500,
            }
        }
    }
}
