// Imports
const express = require("express")
const Notification = require("../models/Notification")
const route = express.Router()
const cors = require("cors")

// Json decryption & header cors reading
route.use(cors())
route.use(express.json())

// Get all notification where target_id == user_id && seen == false
route.get('/:id', (req, res) => {
    Notification.find({
            $and: [{
                target_id: req.params.id
            }, {
                seen: false
            }]
        })
        .then((doc) => {
            res.status(200).send(doc)
        }).catch((err) => {
            console.log(err)
        })
})


// Export routes
module.exports = route;