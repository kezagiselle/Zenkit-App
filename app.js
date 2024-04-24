import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
import  Configs from './configs/index.js';
import cors from 'cors'
import connectDB from './db/connectDB.js'
import ErrorHandler from './middleware/Error.handler.js'
import swaggerUi from 'swagger-ui-express';
import swagger from './docs/swagger.json' assert {type:"json"}
import jwt from 'jsonwebtoken';
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js'
import tagRouter from './routes/tag.js';
// import allRoutes from './routes/index.js';

const corsOption = {
    allowedHeaders: ["Authorization","Content-Type"],
    methods: ["GET","POST","UPDATE"],
    origin: ["http://192.168.1.150.8080","//https://contact-app-client-xbck.onrender.com/"],
}

//middleware
//app.use(notfound)
app.use(express.json());
//app.use(cors(corsOption));
app.use(taskRouter);
app.use(tagRouter);
app.use(userRouter);
app.use(userRouter);
// app.use('/api/v1', allRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));

// app.post('/login',(req,res) => {
//     const username = req.body.username
//     const user = { name: username}
//     const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET))
// }))



const port = process.env.PORT || 4000

//db connection
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI || 'mongodb+srv://gisele:Gisele123@cluster0.is925uq.mongodb.net/')
        app.listen(port, console.log(`server is listening on port ${port}`))
    } catch (error) {
       console.log(error)
    }
}
start();

app.use(ErrorHandler);