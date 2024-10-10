import { User } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";
import authService from "../services/auth-service";
import { loginSchema, registerSchema } from "../utils/schemas/auth-schema";

class AuthController {
    async login(req: Request, res: Response) {
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/LoginDTO"
                    }  
                }
            }
        } 
    */
    
        try {
          const value = await loginSchema.validateAsync(req.body);
          const user = await authService.login(value);
          res.json(user);
        } catch (error) {
          res.status(500).json(error);
        }
      }
    

    async register(req: Request, res: Response) {
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/RegisterDTO"
                    }  
                }
            }
        } 
    */
        try {
            const value = await registerSchema.validateAsync(req.body);
    
            // Check if the email is already registered
            const existingUser = await authService.findUserByEmail(value.email);
            if (existingUser) {
                return res.status(400).json({ error: "Email has already been used." });
            }
    
            const user = await authService.register(value) as User;
    
            // Omit the password from the response
            const { password, ...userWithoutPassword } = user;
    
            // Send the user data without the password
            res.json(userWithoutPassword);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ errors: error.errors });
            }
            const errorMessage = (error as Error).message || "Registration failed.";
            res.status(500).json({ error: errorMessage });
        }
    }
    
    async check(req: Request, res: Response) {
        try {
            const user = (req as any).user;
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

export default new AuthController();