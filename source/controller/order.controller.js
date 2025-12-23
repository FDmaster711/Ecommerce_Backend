import { OrderServices } from "../services/order.service.js";

const orderServices = new OrderServices();

export class OrderController {
    constructor() { }


    create = async (req, res) => {

        try {
            const userId = req.user.id;
            const { items, address } = req.body;

            if (!items || items.length === 0) {
                return res.status(400).json({ message: 'The Cart cannot be empty', error: error.message });
            }

            const result = await orderServices.create(userId, { items, address });
            return res.status(result.status).json(result);

        } catch (err) {
            return res.status(500).json({ message: 'Error proccessing th order', error: err.message });

        }
    }



    getAll = async (req, res) => {

        try {
            const { message, status, data } = await orderServices.getAll();

            return res.status(status).json({
                message,
                data
            });

        } catch (err) {
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }

    }

    updateStatus = async (req, res) => {
        try {
            const {newStatus} = req.body;
            const {id} = req.params;

            if (!newStatus) {
                return res.status(400).json({ message: 'Status is required' });
            }

            const { message, status, data } = await orderServices.updateStatus(id, newStatus);

            return res.status(status).json({
                message,
                data
            })

        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }
    }


    getByUser = async (req, res) => {
        try {
            const userId = req.user.id;
            const { message, status, data } = await orderServices.getByUser(userId);

            return res.status(status).json({ message, data });
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }
    }


    getById = async (req, res) => {
        try {
            const {id} = req.params;
            const user = req.user;
            let result;

            if (!id) return res.status(400).json({ message: 'Order Id is required' });

            if (user.role === 'ADMIN') {
                result = await orderServices.getById(id);
            } else {
                result = await orderServices.getById(id, user.id);
            }


            return res.status(result.status).json(result);
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }
    }


    // source/controllers/order.controller.js

    cancel = async (req, res) => {
        try {
            const { id } = req.params; 
            const user = req.user;     

            const userIdToFilter = (user.role === 'ADMIN') ? null : user.id;

            const result = await orderServices.cancelOrder(id, userIdToFilter);

            return res.status(result.status).json(result);
        } catch (error) {
            res.status(500).json({ message: "Error al cancelar", error: error.message });
        }
    }



}