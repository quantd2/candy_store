const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DogSchema = new Schema({
  name: String,
  description: String,
  characteristics: String
});

module.exports = mongoose.model('Dog', DogSchema);
