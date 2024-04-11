import mongoose from 'mongoose'
const connectDB = (url) => {
    return mongoose
    .connect(url)
    .then(() => console.log('connected to DB...'))
    .catch((err) => console.log(err))
}
export default connectDB