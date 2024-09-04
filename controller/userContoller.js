const User=require('../models/User');
const service =require('../service/userService');
const bcrypt=require('bcryptjs');

const getUser=async(req,res,next)=>{
    try{
  const user=await service.findUser();
  return res.status(200).json(user);
    }catch(e){
        next(e);
    }
}

const postUser=async(req,res,next)=>{
   const{name,email,password,roles,accountStatus}=req.body;
   const users = await User.findOne({email:email});
   if(users){
    return res.status(400).json({message:'User already exist'});
   }

try{
 const user= await service.createUser({name,email,password,roles,accountStatus});
 //save password as hash format in database
 const salt=await bcrypt.genSalt(10);
const convert=await bcrypt.hash(password,salt);
user.password=convert;
user.save();
console.log(user);
return res.status(201).json(user);

   }catch(e){
    next(e);
   }
}


const getUserById=async(req,res,next)=>{
const userId=req.params.userId;
try{
  const user=await service.findUserByProperty('_id',userId);
    
    if(!user){
        return res.status(404).json({message:'User not found'});
    }
    return res.status(200).json(user);
}catch(e){
    next(e);
  }

}

const updateUserById=async(req,res,next)=>{
  const userId=req.params.userId;
    const {name,roles,accountStatus}=req.body;
    try{
  const user = await service.findUserByProperty('_id',userId);
  if(!user){
    return res.status(404).json({message:'User Not Found'});
  }
  user.name = name===undefined?user.name : name;
  user.roles = roles===undefined?user.roles : roles;
  user.accountStatus = accountStatus===undefined?user.accountStatus:accountStatus;

  await user.save();
  return res.status(200).json({message:'Update Successfully',user});
   
}catch(e){
        next(e)
    }
}

const deleteUserById=async(req,res,next)=>{
 const userId=req.params.userId;
 try{
    const user=await service.findUserByProperty('_id',userId);
    if(!user){
        return res.status(404).json({message:'User Not Found'});
    }
    await user.deleteOne();
    return res.status(203).json({message:'Deleted Succesfully',user});

 }catch(e){
    next(e)
 }

}

module.exports={getUser,postUser,getUserById,updateUserById,deleteUserById};