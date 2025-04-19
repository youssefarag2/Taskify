import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes'
import { authenticate } from './middleware/authMiddleware';
import taskRoutes from "./routes/taskRoutes";


dotenv.config()

const app = express()

// Middlewares
app.use(cors())
app.use(express.json()) // parsing incoming JSON
app.use('/api/users', userRoutes)
app.use('/api/tasks', taskRoutes)



app.get('/', authenticate, (req, res)=>{
    res.send("Task Manager API is Running")
})


export default app;