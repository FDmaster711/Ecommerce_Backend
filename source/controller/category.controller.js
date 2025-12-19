import { CategoryServices } from "../services/category.service.js";

const categoryServices = new CategoryServices();

export class CategoryController {
    constructor () {}

    getAll = async (req, res) => {
        const {message,status,data} = await categoryServices.getAll();
        return res.status(status).json({
            message,
            data
        });
    };

    getById = async (req,res) => {
        const {id} = req.params;
        const {message,status,data} = await categoryServices.getById(id);
        return res.status(status).json({
            message,
            data
        });
    };

    getByName = async (req,res) => {
        const {name} = req.params;
        const {message,status,data} = await categoryServices.getByName(name);
        return res.status(status).json({
            message,
            data
        });
    };


    create = async (req,res) => {
        const categoryData = req.body;
        const {message,status,data} = await categoryServices.create(categoryData);
        return res.status(status).json({
            message,
            data
        });
    };

    update = async (req,res) => {
        const {id} = req.params;
        const categoryData = req.body;
        const {message,status,data} = await categoryServices.update(id, categoryData);
        return res.status(status).json({
            message,
            data
        });
    };

    delete = async (req,res) => {
        const {id} = req.params;
        const {message,status,data} = await categoryServices.delete(id);
        return res.status(status).json({
            message,
            data
        });
    };


}