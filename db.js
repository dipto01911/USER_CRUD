const mongoose=require('mongoose');
function connectDB(connectionstring){
    return  mongoose.connect(connectionstring);
}
module.exports=connectDB;