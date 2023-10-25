import mongoose from "mongoose";
const connectDB = (MONGODB_URL) =>{
    mongoose.set('strictQuery',true);
    mongoose.connect(MONGODB_URL)
    .then(()=>console.log('MongoDB connected'))
    .catch((err)=>console.log(err));
}
export default connectDB;

