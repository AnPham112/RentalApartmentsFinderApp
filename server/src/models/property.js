const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
  name: String,
  address: String,
  type: String,
  furniture: String,
  bedroom: Number,
  price: Number,
  reporter: String,
  note: String
}, { timestamps: true })

module.exports = mongoose.model('Property', PropertySchema);