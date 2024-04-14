import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
import cors from 'cors'
import taskRouter from './routes/task.js'
import connectDB from './db/connectDB.js'
import ErrorHandler from './middleware/Error.handler.js'

const corsOption = {
    allowedHeaders: ["Authorization","Content-Type"],
    methods: ["GET","POST","UPDATE"],
    origin: ["http://192.168.1.150.8080","//https://contact-app-client-xbck.onrender.com/"],
}

//middleware
//const app = express();
app.use(express.json());
//app.use(cors(corsOption));
app.use('/tasks', taskRouter)

//app.use(notfound)

const port = process.env.PORT || 4000

//db connection
const start = async () => {
    try {
        // await connectDB(process.env.MONGO_URI || 'mongodb+srv://gisele:Gisele123@cluster0.is925uq.mongodb.net/')
        app.listen(port, console.log(`server is listening on port ${port}`))
    } catch (error) {
       console.log(error)
    }
}
start();

app.use(ErrorHandler);