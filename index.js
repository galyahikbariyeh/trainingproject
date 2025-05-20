const express = require('express');
const connectDB = require('./config/db');


const dotenv = require('dotenv');
const userRouter = require('./routers/userRouters');
const ticketRoutes = require('./routers/ticketRoutes');
const cors=require('cors')
const path = require('path');

dotenv.config();
connectDB()

const app = express();
app.use(cors())
app.use(express.json())
app.use('/api',userRouter)
app.use('/api', ticketRoutes);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'project.html'));
});



const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log('Server is running on port ${PORT}'))


