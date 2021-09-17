const Cuisine = require('../models/cuisine.js');
const User = require('../models/user.js');

const create = async (req,res)=>{
  try{
    if(!req.isAuth){
      throw new Error();
    }
    const user = await User.findById(req.userId);
    if(!user.isOwner){
      throw new Error();
    }
    let result = await Cuisine.findOne({ name: req.body.name });
    if(!result){
      const newCuisine = new Cuisine({
        name: req.body.name,
      });
      result = await newCuisine.save();
      return res.status(200).json({success:true,_id:result._id});
    }
    return res.status(400).json({success:false,errorMsg:"Cuisine already Exists."});
  }catch(error){
    return res.status(400).json({success:false,errorMsg:"Please try again later, something went worng."});
  }
};

module.exports.create = create;