const Order = require('../models/order');
const Product = require('../models/product.js');
const User = require('../models/user.js');


// Normal user can place food order
// args : {amount,productList:[productId,quantity]}
// here Productmeans food

const create = async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error();
    }
    const newOrder = new Order({
      buyer: req.userId,
      date: new Date(),
      amount: req.body.amount,
      productList: req.body.productList,
      isCompleted: false,
    });
    let result = await newOrder.save();
    return res.status(200).json({ success: true, _id: result._id });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, errorMsg: "Please try again later, something went worng." });
  }
};


// controller sends the past orders of normal user

const orderByUserId = async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error();
    }
    let userData = await User.findById(req.userId);
    let result = await Order.find({ buyer: req.userId });
    let data = [];
    for (let i = 0; i < result.length; i++) {
      let tempResult = {};
      let productList = [];
      tempResult['orderId'] = result[i]._id;
      tempResult['amount'] = result[i].amount;
      tempResult['date'] = result[i].date;
      tempResult['email'] = userData.email;
      tempResult['quantity'] = result[i].productList.length;
      for (let j = 0; j < result[i].productList.length; j++) {
        let tempProduct = {};
        let product = await Product.findById(result[i].productList[j][0]);
        tempProduct['itemName'] = product.name;
        tempProduct['itemPrice'] = product.amount;
        tempProduct['quantity'] = result[i].productList[j][1];
        productList.push(tempProduct);
      }
      tempResult['productList'] = productList;
      data.push(tempResult);
    }
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, errorMsg: "Please try again later, something went worng." });
  }
};

// controller sends all the past order made for the resturant with isCompleted argument 
// to show to owner which order is servered to customer and which is not

const allOrder = async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error();
    }
    let result = await Order.find();
    let data = [];
    for (let i = 0; i < result.length; i++) {
      let userData = await User.findById(result[i].buyer);
      let tempResult = {};
      let productList = [];
      tempResult['orderId'] = result[i]._id;
      tempResult['amount'] = result[i].amount;
      tempResult['date'] = result[i].date;
      tempResult['email'] = userData.email;
      tempResult['isCompleted'] = result[i].isCompleted;
      tempResult['quantity'] = result[i].productList.length;
      for (let j = 0; j < result[i].productList.length; j++) {
        let tempProduct = {};
        let product = await Product.findById(result[i].productList[j][0]);
        tempProduct['itemName'] = product.name;
        tempProduct['itemPrice'] = product.amount;
        tempProduct['quantity'] = result[i].productList[j][1];
        productList.push(tempProduct);
      }
      tempResult['productList'] = productList;
      data.push(tempResult);
    }
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, errorMsg: "Please try again later, something went worng." });
  }
};

// toggle value of isCompleted

const serveFood = async (req, res) => {
  try {
    if (!req.isAuth) {
      throw new Error();
    }
    await Order.findByIdAndUpdate(req.body.orderId, { isCompleted: true });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, errorMsg: "Please try again later, something went worng." });
  }
}

module.exports.create = create;
module.exports.orderByUserId = orderByUserId;
module.exports.allOrder = allOrder;
module.exports.serveFood = serveFood;
