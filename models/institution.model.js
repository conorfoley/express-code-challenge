const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let InstitutionSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  email: { type: String, required: true },
  url: { type: String },
});

module.exports = mongoose.model('Institution', InstitutionSchema);
