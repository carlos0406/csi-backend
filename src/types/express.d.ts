// src/types/express.d.ts

declare namespace Express {
  export interface Request {
    session: {
      id: string;
      user: {
        id: string;
        name: string;
        email: string;
        roles: string[];
      };
    };
  }
}
