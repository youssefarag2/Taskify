import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes'

dotenv.config()

const app = express()

// Middlewares
app.use(cors())
app.use(express.json()) // parsing incoming JSON
app.use('/api/users', userRoutes)



app.get('/', (req, res)=>{
    res.send("Task Manager API is Running")
})


export default app;