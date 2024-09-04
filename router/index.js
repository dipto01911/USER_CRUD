
const router=require('express').Router();
const getRoutes=require('./userRouter');
router.use('/api/v1/user',getRoutes);

module.exports=router;