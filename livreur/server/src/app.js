const express = require("express")

// Express app initialization
const app = express()
const cors = require('cors')

// Redirecting to controllers by route
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/livreur', require('./controllers/livreur'))
app.use('/commande', require('./controllers/commande'))
app.use('/livraison', require('./controllers/livraison'))
app.use('/notification', require('./controllers/notification'))


// Export express app
module.exports = app;