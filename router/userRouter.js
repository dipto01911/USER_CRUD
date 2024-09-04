
const router=require('express').Router();
const{getUser,postUser,getUserById,updateUserById,deleteUserById}=require('../controller/userContoller');
//get all user
router.get('/',getUser);

//find user by userId
router.get('/:userId',getUserById)
//update user by userId
router.patch('/:userId',updateUserById)
//delete user by userId
router.delete('/:userId',deleteUserById)
//create User
router.post('/create',postUser)
module.exports=router;