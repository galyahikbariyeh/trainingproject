const express = require('express');
const connectDB = require('./config/db');


const dotenv = require('dotenv');
const userRouter = require('./routers/userRouters');
const cors=require('cors')
dotenv.config();
connectDB()

const app = express();
app.use(cors())
app.use(express.json())
app.use('/api',userRouter)



const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log('Server is running on port ${PORT}'))


