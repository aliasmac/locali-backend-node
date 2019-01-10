const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

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


UserSchema.pre('save', function (next) {
  let user = this
  if (user.isModified('password')) {
    bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => {
        user.password = hash
        next()
      })
  } else {
    next()
  }
})

class UserClass {

  static findByToken(token) {
    console.log("findByToken")
    let decoded;

    try {
      decoded = jwt.verify(token, 'secret')
      // { _id: '5c375fc39597461df6623ace',
      //   access: 'auth',
      //   iat: 1547136217 }
    } catch(e) {

      return Promise.reject()
    }

    return User.findOne({
      '_id': decoded._id,
      'tokens.token': token, //quotes are required when we need a . in the value
      'tokens.access': 'auth'
    })
  }

  static findAndAuthenticate(username, password) {
    return User.findOne({username})
      .then(user => {
        if (!user) { return Promise.reject() }
        return user.authenticateUser(password).then(resp => {
          if (resp) { return user }
        })
      })
  }

  authenticateUser(password) {
    return bcrypt.compare(password, this.password)
  }

  generateAuthToken() {
    let user = this
    let access = 'auth'
    let token = jwt.sign({_id: user._id.toHexString(), access}, 'secret').toString()
  
    user.tokens = user.tokens.concat([{ access, token }])
    return user.save().then(() => token)
  }

  removeToken(token) {
    return this.update({
      $pull: { tokens: token }
    })
  }

  // superseeds the standard browser JSON response to only return specified
  toJSON() {
    return _.pick(this.toObject(), [
      '_id',
      'username'
    ]);
  }

}

UserSchema.loadClass(UserClass)
const User = mongoose.model('user', UserSchema)
module.exports = { User }



// static findAndAuthenticate(username, password) {
//   return User.findOne({username})
//     .then(user => {
//       if (!user) { return Promise.reject() }

//       return new Promise((resolve, reject) => {
//         bcrypt.compare(password, user.password, (err, res) => {
//           if (res) {
//             resolve(user)
//           } else {
//             reject()
//           }
//         })
//       })
//     })
// }