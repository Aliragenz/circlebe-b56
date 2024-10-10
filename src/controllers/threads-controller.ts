import { Request, Response } from "express";
import threadService from "../services/thread-service";
import { createThreadSchema } from "../utils/schemas/thread-schema";
import cloudinaryService from "../services/cloudinary-service";
import { authentication } from "../middlewares/authentication";
import { JwtPayload } from "../types/user";

class threadsController {
    async find(req: Request, res: Response) {
        try {
            const threads = await threadService.getAllThreads();

            res.json(threads);
        } catch (error) {
            res.status(500).json(error);
        }

    }
    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const threads = await threadService.getThreadById(Number(id));

            res.json(threads);
        } catch (error) {
            res.status(500).json(error);
        }

    }
    async create(req: Request, res: Response) {
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                        $ref: "#/components/schemas/CreateThreadDTO"
                    }  
                }
            }
        } 
        */

        console.log('Incoming request data:', req.body);
        console.log('Uploaded file:', req.file);

        try {
            const user = (req as any).user;

            console.log('User from request:', user);

            // Check if user is defined and has an ID
            if (!user || !user.id) {
                console.error('User not found or user ID is undefined');
                return res.status(401).json({ message: 'Unauthorized: User not found' });
            }

            // Prepare the body
            const body: any = {
                ...req.body,
                userId: user.id 
            };

            // Handle image upload if provided
            if (req.file) {
                const image = await cloudinaryService.uploadSingle(req.file as Express.Multer.File);
                body.image = image.secure_url;
            }

            const value = await createThreadSchema.validateAsync(body);

            // Create thread with validated data
            const threads = await threadService.createThread(value, user);

            res.json(threads);
        } catch (error) {
            console.error('Error in create thread:', error); // Log the error for debugging
            if ((error as any).isJoi) {
                // If the error is from Joi validation
                return res.status(400).json({ message: 'Validation error', details: (error as any).details });
            }
            res.status(500).json({ message: 'Internal server error' });
        }
    }



    async update(req: Request, res: Response) {
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/UpdateThreadDTO"
                    }  
                }
            }
        } 
    */
        try {
            const threads = await threadService.updateThread(req.body);

            res.json(threads);
        } catch (error) {
            res.status(500).json(error);
        }

    }

    async delete(req: Request, res: Response) {
        try {

            const { id } = req.params;

            const threads = await threadService.deleteThread(Number(id));

            res.json(threads);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async toggleLike(req: Request, res: Response) {
        try {
            const { id } = req.params; // Thread ID from URL
            const user = (req as any).user; // Assume req.user contains the logged-in user

            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // Get the thread by its ID
            const thread = await threadService.getThreadById(Number(id));

            if (!thread) {
                return res.status(404).json({ message: 'Thread not found' });
            }

            // Check if the user already liked the thread
            const alreadyLiked = thread.likedBy.includes(user.id); // Assuming user.id is the logged-in user's ID

            // Toggle the like
            const updatedThread = await threadService.updateThreadLike({
                id: Number(id),
                likesCount: alreadyLiked ? thread.likesCount - 1 : thread.likesCount + 1, // Increment/Decrement likes
                likedBy: alreadyLiked
                    ? thread.likedBy.filter(userId => userId !== user.id) // Remove user ID
                    : [...thread.likedBy, user.id], // Add user ID
            });

            return res.status(200).json(updatedThread);
        } catch (error) {
            console.error('Error toggling like:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }




}

export default new threadsController();