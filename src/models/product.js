const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  cuisineId: {
    type: Schema.Types.ObjectId,
    ref: 'Cuisine'
  },
});

module.exports = mongoose.model('Product', productSchema);