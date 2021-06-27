const express = require("express")
const bodyParser = require("body-parser")

// Express app initialization
const app = express()

// Redirecting to controllers by route
app.use(bodyParser.json())
app.use('/livreur', require('./controllers/livreur'))
app.use('/commande', require('./controllers/commande'))
app.use('/livraison', require('./controllers/livraison'))
app.use('/notification', require('./controllers/notification'))


// Export express app
module.exports = app;