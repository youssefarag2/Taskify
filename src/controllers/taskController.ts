import { Request, Response } from "express";
import prisma from "../config/prisma";


const taskController = {

    getTasks: async (req: Request, res: Response) =>{
        try{
            const tasks = await prisma.task.findMany({ where: {userId: req.user?.userId}})
            res.status(200).json({ success: true, data: tasks });
        }catch(err){
            res.status(500).json({ success: false, message: "Server error" });
        }
    },

    createTask: async(req: Request, res: Response)=>{
        const {title, description} = req.body

        try{
            const newTask = await prisma.task.create({
                data: {
                    title,
                    description,
                    userId: req.user!.userId
                }
            })

            res.status(201).json({ success: true, data: newTask });
        }catch(err){
            console.log(err)
            res.status(500).json({ success: false, message: "Server error" });
        }
    },

    updateTask: async(req: Request, res: Response)=>{
        const {id} = req.params
        const {title, description, completed} = req.body
        try{
            const updatedTask = await prisma.task.updateMany({
                where: {id, userId: req.user?.userId},
                data: {title, description, completed}
            })
            if (updatedTask.count === 0) {
                res.status(404).json({ success: false, message: "Task not found or unauthorized" });
                return
              }
            res.status(200).json({ success: true, message: "Task updated successfully"});
            return
        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message: "Server Error"})
            return
        }
    },

    deleteTask: async(req: Request, res: Response) =>{
        const {id} = req.params
        try{
            const deletedTask = await prisma.task.delete({where:{id, userId: req.user?.userId}})
            res.status(200).json({ success: true, message: "Task deleted" });
            return
        }catch(err){
            console.log(err)
            res.status(500).json({ success: false, message: "Server error" });
            return
        }
    }
}


export default taskController;
