
const express = require('express');
const connectDB=require('./db');
const User=require('./models/User');
const useRoutes=require('./router/index');
const bodyparser=require('body-parser');
const app=express();
app.use(express.json())
app.use(useRoutes);
app.use((err,req,res,next)=>{
    return res.status(500).json({message:'Server Error Occured'})
})
connectDB('mongodb://localhost:27017/Crud')
.then(()=>{
    console.log('Database connect..');
    app.listen(4000,()=>console.log('Listening..'))
}).catch((err)=>{
    console.log(err)
})
