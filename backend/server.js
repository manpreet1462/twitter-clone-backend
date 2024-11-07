import express from "express"
import authRoutes from './routes/authRoutes.js'
import dotenv from "dotenv"
import {v2 as cloudinary} from "cloudinary"
import connectMongoDB from "./db/DB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"
dotenv.config();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
const app=express();
const PORT = process.env.PORT || 5000

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
})
