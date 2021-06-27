// Imports
const express = require("express")
const Commande = require("../models/Commande")
const route = express.Router()
const cors = require("cors")

// Json decryption & header cors reading

route.use(cors())
route.use(express.json())

// Get all Commandes with status 1
route.get('/', (req, res) => {
    Commande.find({ state: 1 }).then((doc) => {
        res.send(doc)
    }).catch((err) => {
        console.log(err)
    })
})




// Get unique Commande
route.get('/:id', (req, res) => {

    Commande.findById(req.params.id).then((doc) => {
        res.status(200).send(doc)
    }).catch(error =>
        res.status(404).json({ msg: error })
    )

})



// Update state of Commande
route.patch('/:id', (req, res) => {
    console.log(req.params.id);
    const {
        state,
    } = req.body

    Commande.updateOne({
        _id: req.params.id
    }, {
        $set: {
            state: state,
        }
    }).then((response) => {
        res.status(200).send(response)

    }).catch((err) => {
        console.log(err);
    })


})

// Export routes
module.exports = route;