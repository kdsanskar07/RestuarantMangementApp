const Cuisine = require('../models/cuisine.js');
const Product = require('../models/product.js');
const User = require('../models/user.js');


// using this controller owner can only create new food item

const create = async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error();
    }
    const user = await User.findById(req.userId);
    if (!user.isOwner) {
      throw new Error();
    }
    let result = await Product.findOne({ name: req.body.name });
    if (!result) {
      let cuisine = await Cuisine.findOne({ name: req.body.cuisineName });
      const newProduct = new Product({
        name: req.body.name,
        amount: req.body.amount,
        cuisineId: cuisine._id
      });
      result = await newProduct.save();
      return res.status(200).json({ success: true, _id: result._id });
    }
    return res.status(400).json({ success: false, errorMsg: "Product already Exists." });
  } catch (error) {
    return res.status(400).json({ success: false, errorMsg: "Please try again later, something went worng." });
  }
};

// using this controller owner can only delete food item

const remove = async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error();
    }
    const user = await User.findById(req.userId);
    if (!user.isOwner) {
      throw new Error();
    }
    let result = await Product.findByIdAndRemove(req.body.productId);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).json({ success: false, errorMsg: "Please try again later, something went worng." });
  }
};

// using this controller owner can only edit food item details (amount,name)

const update = async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error();
    }
    const user = await User.findById(req.userId);
    if (!user.isOwner) {
      throw new Error();
    }
    console.log(req.body.productId, req.body.name, req.body.amount);
    let result = await Product.findByIdAndUpdate(req.body.productId, { amount: req.body.amount, name: req.body.name });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).json({ success: false, errorMsg: "Please try again later, something went worng." });
  }
};

// this controller sends all the menu items to normal user 

const getAll = async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error();
    }
    let productData = await Product.find({});
    let cuisineData = await Cuisine.find({});
    let data = [];
    for (let i = 0; i < productData.length; i++) {
      let temp = [];
      let cuisineName = "";
      for (let j = 0; j < cuisineData.length; j++) {
        if (productData[i].cuisineId.toString() == cuisineData[j]._id.toString()) {
          cuisineName = cuisineData[j].name;
          break;
        }
      }
      temp.push(productData[i]._id);
      temp.push(cuisineName);
      temp.push(productData[i].name);
      temp.push(productData[i].amount);
      data.push(temp);
    }
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    return res.status(400).json({ success: false, errorMsg: "Please try again later, something went worng." });
  }
};

module.exports.create = create;
module.exports.update = update;
module.exports.getAll = getAll;
module.exports.remove = remove;