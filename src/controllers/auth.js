const User = require('../models/user.js');
const utils = require('../../lib/utills.js');

const login = async (req,res)=>{
  try{
    let result = await User.findOne({ email: req.body.email });
    if(!result){
      const newUser = new User({
        isOwner: false,
        email: req.body.email,
      });
      result = await newUser.save();
    }
    const tokenObject = utils.issueJWT(result._id);
    return res.status(200).json({success:true,token: tokenObject.token,tokenExpiration: tokenObject.expires,isOwner:result.isOwner});
  }catch(error){
    return res.status(400).json({success:false,errorMsg:"Please try again later, something went worng."});
  }
};

module.exports.login = login;