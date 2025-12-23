import prisma from "../lib/db.js";


export class ReviewServices {
    create = async (rewievData, userId) => {
       
       try {
       const {rating, comment, productId} = rewievData;
       
       const productExist = await prisma.product.findFirst({
        where:{id: productId}
       });

       if(!productExist) return {message: 'Product not found', status: 404};
       
       
       const review = await prisma.review.create({
        data: {
            rating: Number(rating),
            comment,
            userId,
            productId
        },
       include: {
        user: {
            select: {
                name: true
            }
        }
       }
    });
        return {
            message: 'Review Uploaded successfully',
            status: 201,
            data: review
        }
       
       } catch (err) {
        console.error(err.message);
        return {
            message: 'Internal Server Error',
            status: 500
        }
       }
    }

    getAll = async () => {

        try {
            const result = await prisma.review.findMany({
                include: {
                    user: {
                        select: {
                            name: true
                        }
                    },
                    product: {
                        select: {
                            name: true
                        }
                    }
                },
                orderBy: {createdAt: 'desc'}
            });

            if(result.length === 0) return {message: 'Reviews Not found', status: 200}
            
            return {
                message: 'Reviews Found Successfully',
                status: 200,
                data: result
            }

        } catch (err) {
            console.error(err.message);
            return {
                message: 'Internal Server Error',
                status: 500,
            }
            
        }
    }

    update = async (reviewId,userId,reviewdData) => {

        try {
        const {comment, rating} = reviewdData;

        const existingReview = await prisma.review.findUnique({
            where: {id: reviewId}
        });

        if(!existingReview) return {message: 'Review Not Found', status: 404}

        if(existingReview.userId !== userId) return {message: 'Unauthorized: You can only edit your own reviews', status: 403}
        
        const updatedReview = await prisma.review.update({
            where: {id: reviewId},
            data: {
                ...(comment !== undefined && {comment} ),
                ...(rating && {rating: Number(rating)})
            }
        });

        return {
            message: 'Review Updated successfully',
            status: 200,
            data: updatedReview
        }
    
    }catch(err){
      console.error(err.message);
      return {
        message: 'Internal Server Error',
        status: 500
      }
    }
}


 delete = async (userId, reviewId) => {
    try {
        const deletedReview = await prisma.review.deleteMany({
            where: {
                id: reviewId,
                ...(userId && {userId})
            }
        });

        if(deletedReview.count === 0) return {message: 'Review Not found or unauthorized', status: 404}

        return {
            message: 'Review deleted successfully',
            status: 200,
            data: deletedReview
        }
    } catch (err) {
        console.error(err.message);
        return {
            message: 'Internal Server Error',
            status: 500
        }
    }  
 }




}