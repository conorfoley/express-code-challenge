const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let InstitutionSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  domain: { type: String, required: true },
  url: { type: String, required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});

module.exports = mongoose.model('Institution', InstitutionSchema);
