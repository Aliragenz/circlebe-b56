import { JwtPayload } from './user'; // Adjust the path if necessary

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // Use the backend-specific user type
    }
  }
}
