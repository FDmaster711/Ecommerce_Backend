import { UserServices } from "../services/user.service.js";

const userServices = new UserServices();

export class UserController {
    constructor () {}

    getAllUsers = async (req,res) => {
        try {
            const {message, status, data} = await userServices.getAll();
            return res.status(status).json({
                message,
                data
            });
        } catch (err) {
            return res.status(500).json({message: 'Internal Server Error', error: err.message});
    } }

    getUserById = async (req,res) => {
        try {
            const userId = req.params.id;
            const {message, status, data} = await userServices.getById(userId);
            return res.status(status).json({
                message,
                data
            });
        } catch (err) {
            return res.status(500).json({message: 'Internal Server Error', error: err.message});
        }
    }


    getUserByEmail = async (req,res) => {
        try {
            const {email} = req.params;
            const {message,status,data} = await userServices.getByEmail(email);
            return res.status(status).json({
                message,
                data
            })
        } catch (err) {
            
        }
    }

     deleteUser = async (req,res) => {
        try {
            const {id} = req.params;
            const {message,status,data} = await userServices.delete(id);
            return res.status(status).json({
                message,
                data
            });
        } catch (err) {
            return res.status(500).json({message: 'Internal Server Error', error: err.message});
        }
    }

    updateUser = async (req,res) => {
        try {
            const {id} = req.params;
            const {message,status,data} = await userServices.update(id,req.body);
            return res.status(status).json({
                message,
                data
            });
        } catch (err) {
            return res.status(500).json({message: 'Internal Server Error', error: err.message});
        }
    }

}