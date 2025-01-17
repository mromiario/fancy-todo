const express = require('express')
const routes = express.Router()
const controller = require('../controllers/controllerTodo')
const auth= require('../middleware/auth')


routes.use(auth.authentication)
routes.post('/',controller.create)
routes.get('/',controller.read)
routes.get('/holiday',controller.holiday)

routes.get('/:id',auth.authorization,controller.findOne)
routes.patch('/:id',auth.authorization,controller.update)
routes.delete('/:id',auth.authorization,controller.delete)


module.exports = routes