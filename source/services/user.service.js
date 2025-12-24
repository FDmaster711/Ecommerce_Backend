import prisma from "../lib/db.js";
import bcrypt from "bcrypt";

export class UserServices {
    constructor() { }

    getAll = async () => {
        try {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true
                }
            });
            return {
                message: users.length === 0 ? "Users Not found" : "Users retrieved successfully",
                status: 200,
                data: {
                    users,
                    total: users.length
                }
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    getById = async (id) => {
        try {
            const user = await prisma.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true
                }
            });
            return {
                message: user ? "User retrieved successfully" : "User Not found",
                status: user ? 200 : 404,
                data: user ? { user } : null
            }
        } catch (err) {
            console.error(err.message);

        }
    }

    getByEmail = async (email) => {
        try {
            const user = await prisma.user.findUnique({
                where: { email }
            });

            return {
                message: user ? "User retrieved successfully" : "User Not found",
                status: user ? 200 : 404,
                data: user ? { user } : null
            }
        } catch (err) {
            console.error(err.message);
            return {
                message: 'Internal Server Error',
                status: 500
            }
        }

    }

    create = async (userData) => {
        try {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const newUser = await prisma.user.create({
                data: {
                    ...userData,
                    password: hashedPassword
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true
                }
            })

            return {
                message: "User created successfully",
                status: 201,
                data: {
                    user: newUser
                }
            }
        } catch (err) {
            console.error("Prisma Error Code:", err.code);

            // 2. Usamos el código P2002 (Unique constraint failed)
            // El check del target lo hacemos más flexible con ?.
            if (err.code === 'P2002') {
                const isEmail = err.meta?.target?.includes('email') || true;

                if (isEmail) {
                    return {
                        message: "Email already exists",
                        status: 400,
                    };
                }
            }

            return {
                message: 'Internal Server Error',
                status: 500,
                error: err.message // Útil para desarrollo
            };
        }

    }

    getInternalById = async (id) => {
        try {
            const user = await prisma.user.findUnique({
                where: { id }
            });
            return {
                status: user ? 200 : 404,
                data: user ? { user } : null
            };
        } catch (err) {
            console.error(err.message);
            return { status: 500 };
        }
    }


    update = async (id, userData) => {
        try {
            if (userData.password) {
                userData.password = await bcrypt.hash(userData.password, 10);
            }
            const updatedUser = await prisma.user.update({
                where: { id },
                data: userData,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true
                }
            })
            return {
                message: "User updated successfully",
                status: 200,
                data: {
                    user: updatedUser
                }
            }
        } catch (err) {

            console.error("Prisma Error Code:", err.code);

            if (err.code === 'P2002') {
                const isEmail = err.meta?.target?.includes('email') || true;

                if (isEmail) {
                    return {
                        message: "Email already exists",
                        status: 400,
                    };
                }
            }

            return {
                message: 'Internal Server Error',
                status: 500,
                error: err.message // Útil para desarrollo
            };
        }
    }

    delete = async (id) => {
        try {
            const deletedUser = await prisma.user.delete({
                where: { id }
            });
            return {
                message: "User deleted successfully",
                status: 200,
                data: {
                    user: deletedUser
                }
            }
        } catch (err) {
            if (err.code === 'P2025') {
                return {
                    message: "User Not found",
                    status: 404,
                    data: null
                };
            }
            console.error(err.message);
            return {
                message: 'Internal Server Error',
                status: 500,
            }
        }
    }
}