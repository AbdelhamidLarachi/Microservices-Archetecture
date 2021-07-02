// Imports
const express = require("express")
const route = express.Router()
const Commande = require("../models/Commande")
const Livraison = require("../models/Livraison")
const cors = require("cors")

// Json decryption & header cors reading
route.use(cors())
route.use(express.json())

// Get Statistics
route.get('/', (req, res) => {

    Commande.countDocuments({ state: 0 }).then((nb) => {
        Livraison.countDocuments({ state: 0 }).then((nb2) => {
            Commande.countDocuments({ state: 1 }).then((nb3) => {
                Livraison.countDocuments({ state: 1 }).then((nb4) => {

                    res.status(200).json([{
                        type: "Commandes en attente",
                        number: nb
                    }, {
                        type: "Livraisons acceptées",
                        number: nb2
                    }, {
                        type: "Commandes acceptées",
                        number: nb3
                    }, {
                        type: "Livraisons aquittées",
                        number: nb4
                    }])
                })
            })
        })
    })
})


// Export routes
module.exports = route;