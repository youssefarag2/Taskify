import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'


const JWT_SECRET = process.env.JWT_SECRET as string;

interface JwtPayload{
    userId: string
    email: string
}

// ✅ Module augmentation to extend Request in this file
declare module "express-serve-static-core" {
    interface Request {
      user?: {
        email: string;
        userId: string;
      };
    }
  }

export const authenticate = (req: Request, res: Response, next: NextFunction)=>{
    const authHeadr = req.headers.authorization

    if(!authHeadr || !authHeadr.startsWith('Bearer ')){
        res.status(401).json({success: false, message:"Unauthorized"})
        return
    }

    const token = authHeadr.split(' ')[1]

    try{
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
        req.user = {
            email: decoded.email,
            userId: decoded.userId,
          };
        next()
    }catch(err){
        res.status(403).json({ success: false, message: "Invalid token" });
        return
    }
}