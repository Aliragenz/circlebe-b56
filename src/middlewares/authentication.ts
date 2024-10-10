import { Request, NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

export function authentication(
    
  req: Request, 
  res: Response, 
  next: NextFunction
) {
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
   
  const authorizationHeader = req.header("Authorization");

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    console.log("Authorization header missing or incorrect format.");
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authorizationHeader.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Authorization token not found!" });
  }

  try {
    const secretKey = process.env.JWT_SECRETKEY as string;
    const decoded = jwt.verify(token, secretKey);
    console.log('Decoded user:', decoded);

    // Attach the decoded user to the request object
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
