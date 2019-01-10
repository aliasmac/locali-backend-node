const UsersController = require('../controllers/users_controller')
const BroadcastsController = require('../controllers/broadcasts_controller')
const MessagesController = require('../controllers/messages_controller')
const { authenticate } = require('../middleware/authenticate')

module.exports = app => {

  app.get('/api/v1', authenticate, UsersController.greeting)

  // USER ROUTES
  app.get('/api/v1/users', UsersController.all)
  app.post('/api/v1/users', UsersController.create)
  // app.post('/api/v1/login', UsersController.login)
  // app.get('/api/v1/validate', UsersController.validate)
  // app.get('/api/v1/users/:id', UsersController.getUserObj)

  // BROADCATS ROUTES 
  // app.post('/api/v1/brodcasts', BroadcastsController.create)
  // app.post('/api/v1/broadcasts', BroadcastsController.save)
  // app.delete('./api/v1/broadcast/:id', BroadcastsController.delete)
  // app.get('/api/v1/broadcastbypin', BroadcastsController.getBroadcast)

  // MESSAGES ROUTES 
  // app.post('/api/v1/messages', MessagesController.create)
  // app.patch('/api/v1/messages/:id', MessagesController.edit)
  // app.delete('/api/v1/messages/:id', MessagesController.delete)

}


