// src/types/express.d.ts
import 'express';

declare module 'express' {
  export interface Request {
    session: {
      id: string;
      user: {
        id: string;
        name: string;
        email: string;
      };
    };
  }
}
