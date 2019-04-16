const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  email: { type: String, required: true },
  role: { type: String, required: true, enum: ['student', 'academic', 'administrator'] },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);
