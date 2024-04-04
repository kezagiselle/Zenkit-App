import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
import cors from 'cors'

//middleware
app.use(express.json());
app.use(cors());
app.use('/tasks', tasks)
app.use(notfound)

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
start()