const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String, 
    required: true
  },
  password: {
    type: String,
    require: true,
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }],
  broadcasts: [{
    type: Schema.Types.ObjectId,
    ref: 'broadcast'
  }]

})

const User = mongoose.model('user', UserSchema)
module.exports = User

