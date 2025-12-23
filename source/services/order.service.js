// source/services/order.service.js
import prisma from "../lib/db.js";

export class OrderServices {


    getAll = async () => {
        try {
            const orders = await prisma.order.findMany({
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    },
                    items: {
                        include: {
                            product: {
                                select: {
                                    name: true,
                                    imageUrl: true
                                }
                            }
                        }

                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            return {
                message: orders.length === 0 ? 'Orders Not Found' : 'Orders found successfully',
                status: 200,
                data: orders
            }
        } catch (err) {
            console.error(err.message);
            return {
                message: 'Internal Server Error',
                status: 500
            }
        }
    }

    create = async (userId, orderData) => {
        try {
            const { items, address } = orderData;

            return await prisma.$transaction(async (tx) => {
                let total = 0;
                const orderItemsData = [];

                for (const item of items) {
                    const product = await tx.product.findUnique({
                        where: { id: item.productId }
                    });

                    if (!product) {
                        throw new Error('Product Not Found');
                    }

                    if (product.stock < item.quantity) {
                        throw new Error('Insufficient stock of products');
                    }

                    const subtotal = Number(product.price) * item.quantity;
                    total += subtotal;

                    orderItemsData.push({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: product.price

                    });

                    await tx.product.update({
                        where: { id: item.productId },
                        data: { stock: { decrement: item.quantity } }
                    });
                }

                const newOrder = await tx.order.create({
                    data: {
                        userId,
                        address,
                        total,
                        items: {
                            create: orderItemsData
                        }
                    },
                    include: { items: true }
                });

                return {
                    message: 'Order created successfully',
                    status: 201,
                    data: newOrder
                }
            });
        } catch (err) {
            console.error(err.message);
            return {
                message: 'Server has Failed',
                status: 400
            }
        }
    }


    updateStatus = async (orderId, newStatus) => {

        try {
            const updatedOrder = await prisma.order.update({
                where: { id: orderId },
                data: {
                    status: newStatus
                }
            });

            return {
                message: 'Status updated successfully',
                status: 200,
                data: updatedOrder
            }
        } catch (err) {
            if (err.code === 'P2025') {
                return {
                    message: 'Order Not Found',
                    status: 404,
                    data: null
                }
            }

            if (err.message.includes('Invalid value for Enum')) {
                return {
                    message: `Status '${newStatus}' is not valid`,
                    status: 400,
                    data: null
                };
            }

            console.error(err.message);

            return {
                message: 'Internal server error',
                status: 500
            }
        }
    }


    getByUser = async (userId) => {
        try {
            const userOrders = await prisma.order.findMany({
                where: {userId},
                include: {
                    items: {
                        include: {
                            product: {
                                select: {
                                    name: true,
                                    imageUrl: true
                                }
                            }
                        }
                    }
                }
            });
            
            return {
                message: userOrders.length === 0 ? 'Orders Not Found' : 'Orders Found Successfully',
                status: 200,
                data: userOrders
            }
        } catch (err){
            console.error(err.message);
            return {
                message: 'Internal Server Error',
                status: 500
            }
        }
    }

    getById = async (orderId, userId= null) => {
         try {
            const foundOrder = await prisma.order.findFirst({
                where: {id: orderId,
                        ...(userId && {userId: userId})
                },
                include: {
                    items: {
                        include: {
                            product: {
                                select: {
                                    name: true,
                                    imageUrl: true
                                }
                            }
                        }
                    }
                }
            });

            return {
                message: !foundOrder ? 'Order Not Found' : 'Order Found Successfully',
                status: !foundOrder ? 404 : 200,
                data: foundOrder
            }

         } catch (err) {
            console.error(err.message);
            return {
                message: 'Internal Server Error',
                status: 500
            }
         }
    }

    cancelOrder = async (orderId,userId = null) => {
        try {
            return await prisma.$transaction(async (tx) => {
                const order = await tx.order.findFirst({
                    where: {
                        id: orderId,
                        ...(userId && {userId: userId})
                    },
                    include: {
                        items: true
                    }
                });

                if(!order){
                    throw new Error('Order not found Or user unauthorized');
                }

                if(order.status === 'SHIPPED' || order.status === 'DELIVERED'){
                    throw new Error('An order that is already in transit or delivered cannot be cancelled.');
                }

                if(order.status === 'CANCELLED'){
                    throw new Error('This Order Has already been cancelled');
                }

                for (const item of order.items){
                    await tx.product.update({
                        where: {id: item.productId},
                        data: {stock: {increment: item.quantity}}
                    });
                }

                const cancelledOrder = await tx.order.update({
                    where: {id: orderId},
                    data: {status: 'CANCELLED'}
                });

                 return {
                message: 'Order Cancelled successfully',
                status: 200,
                data: cancelledOrder
            }
            })

           
        } catch (err) {
            return {
                message: err.message,
                status: 400
            }
            
        }
    }
}