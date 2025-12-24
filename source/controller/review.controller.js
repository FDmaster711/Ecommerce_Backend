import { ReviewServices } from "../services/reviews.service.js";

const reviewServices = new ReviewServices()

export class ReviewController {

    getAll = async (req, res) => {
        try {
            const { message, status, data } = await reviewServices.getAll();
            return res.status(status).json({message,data});
        } catch (error) {
             return res.status(500).json({message: 'Internal Server Error', error: error.message});
        }
    }


    create = async (req,res) => {
        try {
            const userId = req.user.id;
            const reviewData = req.body;

            const result = await reviewServices.create(reviewData,userId);

            return res.status(result.status).json(result);
        } catch (err) {
            return res.status(500).json({message: 'Internal Server Error', error: err.message});
            
        }
    }

    update = async (req,res) => {
       try {
        const {id} = req.params;
        const userId = req.user.id;
        const reviewData = req.body;

        const result = await reviewServices.update(id,userId,reviewData);

        return res.status(result.status).json(result);

       } catch (err) {
        return res.status(500).json({message: 'Internal Server Error', error: err.message});
       }
    }

     delete = async (req,res) => {
      try {
        const user = req.user;
      const {id} = req.params;

      const userIdFilter = (user.role === 'ADMIN') ? null : user.id;

      const result = await reviewServices.delete(userIdFilter,id);
      return res.status(result.status).json(result);        
      } catch (err) {
        return res.status(500).json({message: 'Internal Server Error', error: err.message});
      }

    }

}