const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    birthday: { type: String, default: '' },
    gender: { type: String, default: '' },
    image: { type: String, default: '' }
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)