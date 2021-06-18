const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json())
app.use('/livreur', require('./controllers/livreur'))
app.use('/commande', require('./controllers/commande'))


// Export routes
module.exports = app;