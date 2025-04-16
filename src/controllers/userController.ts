import { Request, Response } from "express";
import prisma from "../config/prisma";
import bcrypt from 'bcrypt';

const userController = {
    registerUser: async (req: Request, res: Response) => {

        const { email, password } = req.body;
        try {
          const existingUser = await prisma.user.findUnique({ where: { email } });
      
          if (existingUser) {
            res.status(409).json({ success: false, message: "User already exists" });
            return
          }
      
          const hashedPassword = await bcrypt.hash(password, 13);
          const newUser = await prisma.user.create({
            data: {
              email,
              password: hashedPassword,
            },
          });
      
          res.status(201).json({ success: true, data: newUser });
          return
        } catch (error) {
          console.error("Register Error:", error);
          res.status(500).json({ success: false, message: "Server error" });
          return
        }
      },
    loginUser:async (req: Request, res: Response) => {
        const {email, password} = req.body
        try{
            const user = await prisma.user.findUnique({ where: { email } });

            if(!user){
                res.status(404).json({success: false, message:"Email not found"})
                return
            }
    
            const isMatch = await bcrypt.compare(password, user.password)
    
            if(!isMatch){
                res.status(401).json({ success: false, message: "Incorrect password" });
                return
            }
    
            res.status(200).json({ success: true, message: "Login successful" });
            return
        }catch(error){
            console.error("Login Error:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
            return
        }
    
       
    },
};

export default userController;