const {User} = require('../models/user')

module.exports = {

  greeting(req, res) {
   res.send(req.user)
  },

  all(req, res, next) {
    User.find({})
      .then(users => res.send(users))
      .catch(next)
  },

  create(req, res, next) {
    console.log("USER CONTROLLER - CREATE:", req.body)
    let user = new User(req.body)
    user.save()
      .then(() => user.generateAuthToken())
      .then(token => res.header('x-auth', token).send(user))
      .catch(next)
  },





}