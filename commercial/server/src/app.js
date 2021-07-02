const express = require("express")
const bodyParser = require("body-parser")

// Express app initialization
const app = express()

// Redirecting to controllers by route
app.use(bodyParser.json())
app.use('/clients', require('./controllers/client'))
app.use("/stats", require("./controllers/stats"))

// Export express app
module.exports = app;