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

  login(req, res, next) {
    User.findAndAuthenticate(req.body.username, req.body.password)
      .then( user => {
        return user.generateAuthToken()
          .then(token => res.header('x-auth', token).send(user))
      }).catch(err => response.status(400).send())
  }

}

// exports.login = (request, response) => {
//   User.findAndAuthenticate(request.body.username, request.body.password)
//     .then(user => { 
//         user.generateToken()
//         .then(token => {
//           response.header('Access-Control-Expose-Headers', 'authorization')
//           response.header('authorization', token)
//           return user.populate()
//         })
//         .then(user => response.send({ user }))
//       }).catch(err => response.status(400).send())
// }