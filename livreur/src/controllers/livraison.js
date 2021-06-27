// Imports
const express = require("express")
const Livraison = require("../models/Livraison")
const route = express.Router()
const cors = require("cors")

// Json decryption & header cors reading
route.use(cors())
route.use(express.json())

// Get all Livraisons
route.get('/', (req, res) => {
    Livraison.find({}).then((doc) => {
        res.send(doc)
    }).catch((err) => {
        console.log(err)
    })
})




// Get unique livraison
route.get('/active/:id', (req, res) => {

    Livraison.findOne({ $and: [{ id_livreur: req.params.id }, { state: 0 }] }).then((doc) => {
        res.status(200).send(doc)
    }).catch(error =>
        res.status(404).json({ msg: error })
    )

})

// Create new Livraison
route.post('/', async(req, res, next) => {

    const {
        id_restaurateur,
        restaurateur_name,
        restaurateur_address,
        restaurateur_phone,
        id_client,
        client_name,
        client_address,
        client_phone,
        id_livreur,
        livreur_name,
        livreur_phone,
        articles,
        prix,
        date,
        state
    } = req.body

    let livraison = {}

    livraison.id_restaurateur = id_restaurateur
    livraison.restaurateur_name = restaurateur_name
    livraison.restaurateur_address = restaurateur_address
    livraison.restaurateur_phone = restaurateur_phone
    livraison.id_client = id_client
    livraison.client_name = client_name
    livraison.client_address = client_address
    livraison.client_phone = client_phone
    livraison.id_livreur = id_livreur
    livraison.livreur_name = livreur_name
    livraison.livreur_phone = livreur_phone
    livraison.articles = articles
    livraison.prix = prix
    livraison.date = date
    livraison.state = state

    let livraisonModel = new Livraison(livraison)

    try {
        await livraisonModel.save()
        res.status(201).send("Data created")

    } catch (error) {
        res.json({
            message: error
        })

    }


})




// Update Livraison state
route.patch("/state/:id", (req, res) => {
    Livraison.updateOne({
        _id: req.params.id
    }, {
        state: 1
    }).then((response) => {
        res.status(200).send("Data updated")
    }).catch((err) => {
        console.log(err)
    })
})



// Export routes
module.exports = route;