// Imports
const express = require("express")
const Client = require("../models/Client")
const route = express.Router()
const cors = require("cors")

// Json decryption & header cors reading
route.use(cors())
route.use(express.json())

// Get all clients
route.get('/', (req, res) => {
    Client.find({}).then((doc) => {
        res.send(doc)
    }).catch((err) => {
        console.log(err)
    })
})




// Get unique client
route.get('/:id', (req, res) => {

    Client.findById(req.params.id).then((doc) => {
        res.status(200).send(doc)
    }).catch(error =>
        res.status(404).json({ msg: error })
    )

})



// Delete Client
route.delete('/:id', async(req, res) => {

    try {

        await Client.deleteOne({
            _id: req.params.id
        })

        res.status(200).send("Data deleted")
    } catch (error) {
        res.json({
            message: error
        })
    }
})


// Suspend Client account
route.put("/:id", (req, res) => {
        Client.updateOne({
            _id: req.params.id
        }, {
            $set: {
                suspended: req.body.suspended
            }
        }).then((reponse) => {
            res.send(reponse)
        }).catch((err) => {
            console.log(err)
        })

    })
    // Export routes
module.exports = route;