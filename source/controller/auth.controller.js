import { UserServices } from "../services/user.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userServices = new UserServices();

export class AuthController {
    constructor () {}

    Register = async (req,res) => {
        
       try { 
        const userData = req.body;
        const {message,status,data} = await userServices.create(userData);

       if(status !== 201) {
        return res.status(status).json({
            message,
            data
        });
       }

        const token = jwt.sign({
            id: data.user.id,
            role: data.user.role
        }, process.env.JWT_SECRET, {expiresIn: '8h'});
        return res.status(status).json({
            message,
            data: {
                user: data.user,
                token
            }
        });
        } catch (err) {
            return res.status(500).json({message : 'Internal Server Error', error: err.message});
        }
    }

    login = async (req,res) => {

        try {
        const {email, password} = req.body;

        const result = await userServices.getByEmail(email);

        if (result.status === 404) {
            return res.status(401).json({
                message: 'Invalid Credentials'
            });
        }

        const user = result.data.user;

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid Credentials'
            });
        }

        const token = jwt.sign({
            id: user.id,
            role: user.role
        }, process.env.JWT_SECRET, {expiresIn: '8h'});

        const {password: _, ...userWithoutPassword} = user;

        return res.status(200).json({
            message: 'Login successful',
             data: {
                token,
                user: userWithoutPassword
             }
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({message : 'Internal Server Error', error: err.message});
    }
}

getMe = async (req,res) => {
    try {
        const userId = req.user.id;
        const result = await userServices.getById(userId);

        if(result.status === 404) {
            return res.status(404).json({
                message: 'User Not Found'
            });
        }

        return res.status(200).json({
            message: 'User retrieved successfully',
            data: result.data
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({message : 'Internal Server Error', error: err.message});       
    }
}

logout = async (req,res) => {
    return res.status(200).json({
        message: 'Logout successful'
    })
}

changePassword = async (req,res) => {
    try {
        const userId = req.user.id;
        const {oldPassword, newPassword} = req.body;

        const result = await userServices.getInternalById(userId);

        if(result.status === 404) {
            return res.status(404).json({
                message: 'User Not Found'
            });
        }
        
        const user = result.data.user;
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: 'Old Password is incorrect'
            });
        }

        const updatedResult = await userServices.update(userId, {password: newPassword});

        return res.status(updatedResult.status).json({
            message: "Password updated successfully",
            data: updatedResult.data
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({message : 'Internal Server Error', error: err.message});       
    }
}


}