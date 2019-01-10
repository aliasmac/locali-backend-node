const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
const _ = require('lodash')

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


class UserClass {

  generateAuthToken() {
    let user = this
    let access = 'auth'
    let token = jwt.sign({_id: user._id.toHexString(), access}, 'secret').toString()
  
    user.tokens = user.tokens.concat([{ access, token }])
    return user.save().then(() => token)
  
  }

  toJSON() {
    return _.pick(this.toObject(), [
      '_id',
      'username'
    ]);
  }

}

UserSchema.loadClass(UserClass)
const User = mongoose.model('user', UserSchema)
module.exports = User



