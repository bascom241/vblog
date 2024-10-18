const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
 const cors = require('cors');

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


dotenv.config({path:'./.env'})
const blogRouter = require('./routes/blogRouter')
const userRouter = require('./routes/userRouter')

app.use(express.json())
// app.use('/images',express.static(path.join(__dirname, 'uploads')))
app.use('/api/list/posts', blogRouter)
app.use('/api/user',userRouter )



module.exports = app















