const express = require("express")
const bodyParser = require("body-parser")

// Express app initialization
const app = express()

// Redirecting to controllers by route
app.use(bodyParser.json())

app.use('/api/articles', require('./routes/articles'));
app.use('/api/restaurateur', require('./routes/restaurateur'));
app.use('/api/commandes', require('./routes/commandes'));
app.use('/api/client', require('./routes/client'));
app.use('/api/notifications', require('./routes/notification'));
app.use('/api/livraisonsclient', require('./routes/livraisonsclient'));

// Export express app
module.exports = app;