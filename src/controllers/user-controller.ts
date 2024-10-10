import { Request, Response } from "express";
import UserService from "../services/user-service";
import { createUserSchema } from "../utils/schemas/user-schema";

class UserController {
    async find(req: Request, res: Response) {
        try {
            const users = await UserService.getAllUsers();

            res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }

    }
    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const users = await UserService.getUserById(Number(id));

            res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }

    }
    async findByEmail(req: Request, res: Response) {
        try {
            const { email } = req.params;
            const users = await UserService.getUserByEmail(email);

            res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }

    }
    async create(req: Request, res: Response) {
        try {
            const value = await createUserSchema.validateAsync(req.body)

            const users = await UserService.createUser(value);

            res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }


    }
    async update(req: Request, res: Response) {
        try {
            const users = await UserService.updateUser(req.body);

            res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }

    }

    async delete(req: Request, res: Response) {
        try {

            const { id } = req.params;

            const users = await UserService.deleteUser(Number(id));

            res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

export default new UserController();