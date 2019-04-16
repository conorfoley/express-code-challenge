const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  email: { type: String, required: true },
  role: { type: String, required: true, enum: ['student', 'academic', 'administrator'] },
  password: { type: String, required: true },
  institution: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true },
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
