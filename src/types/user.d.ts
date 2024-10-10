export interface JwtPayload {
    id: number;
    fullName: string;
    email: string;
    role: string;
    image: string;
    // Add any other properties you expect from the JWT
  }