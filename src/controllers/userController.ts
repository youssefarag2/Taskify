import { Request, Response } from "express";

const userController = {
    registerUser: (req: Request, res: Response) => {
        res.json({ message: "Register User" });
    },
    loginUser: (req: Request, res: Response) => {
        res.json({ message: "Login User" });
    },
};

export default userController;