const express = require('express');
const userRouter=require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
const cors=require('cors')
const dotenv = require('dotenv')
const mongoose=require('mongoose')
dotenv.config();

const app = express();

mongoose.connect(process.env.mongoURL + 'e-commerce')
.then(result=>console.log('DB is Connected!'))

// middleware to parse request body
app.use(express.json());
app.use(cors())
// routes
app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.listen(process.env.PORT); 