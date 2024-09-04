const {Schema,model}=require('mongoose')
const userschema=new Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:15
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator:function(e){
            return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e);
        },
        message:'Invalid email type',
    },
    },
    password:{
    type:String,
    minlength:[4,'password is too short'],
  required:true,
    },

    roles:{
        type:[String],
        required:true,
        default:['STUDENT']

    }, 
    accountStatus:{
       type: String,
       enum:['PENDING','ACTIVE','REJECTED'],
       default:'PENDING',
       required:true,
    },
})


const User=model('User',userschema);
module.exports=User;