import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
import  Configs from './configs/index.js';
import cors from 'cors'
import taskRouter from './routes/task.js'
import connectDB from './db/connectDB.js'
import ErrorHandler from './middleware/Error.handler.js'
import swaggerUi from 'swagger-ui-express';
import swagger from './docs/swagger.json' assert {type:"json"}
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const corsOption = {
    allowedHeaders: ["Authorization","Content-Type"],
    methods: ["GET","POST","UPDATE"],
    origin: ["http://192.168.1.150.8080","//https://contact-app-client-xbck.onrender.com/"],
}

//middleware
//const app = express();
//app.use(notfound)
app.use(express.json());
//app.use(cors(corsOption));
app.use('/tasks', taskRouter)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));


app.post('/users',async (req,res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        console.log(salt)
        console.log(hashedPassword)
        const user = { name: req.body.name, password: req.body.password }
        users.push(user)
        res.status(201).send()
    } catch (err){
        next(err)
    } 
});

app.post('/users/login', async(req, res) =>{
    const user = users.find(user => user.name = req.body.name)
    if(user == null) {
        return res.status(400).send("can not find user")
    }
    try {
        if(await bcrypt.compare(req.body.password,user.password)){
            res.send("Success")
        } else{
            res.send("Not Allowed")
        }
    } catch(err){
        next(err)
    }
})

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