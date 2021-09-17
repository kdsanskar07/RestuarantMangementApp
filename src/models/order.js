const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  productList: {
    type: Array,
    required: true
  },
  isCompleted: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Order', orderSchema);