// Imports
const express = require("express")
const Livreur = require("../models/Livreur")
const route = express.Router()
const cors = require("cors")

route.use(cors())
route.use(express.json())

// Get all Livreur
route.get('/', (req, res) => {
    Livreur.find({}).then((doc) => {
        res.send(doc)
    }).catch((err) => {
        console.log(err)
    })
})




// Get unique Livreur
route.get('/:id', (req, res) => {

    Livreur.findById(req.params.id).then((doc) => {
        res.status(200).send(doc)
    }).catch(error =>
        res.status(404).json({ msg: error })
    )

})

// Create new Livreur
route.post('/', async(req, res, next) => {

    const {
        credential_id,
        name,
        lastname,
        phone_number,
        verified,
        private
    } = req.body

    let livreur = {}

    livreur.credential_id = credential_id
    livreur.name = name
    livreur.lastname = lastname
    livreur.phone_number = phone_number
    livreur.verified = verified
    livreur.private = private

    let livreurModel = new Livreur(livreur)

    try {
        await livreurModel.save()
        res.status(201).send("Data created")

    } catch (error) {
        res.json({
            message: error
        })

    }


})




// Update Livreur
route.patch('/:id', async(req, res) => {
    console.log(req.params.id);
    const {
        name,
        lastname,
        phone_number,
        verified,
        private
    } = req.body

    try {
        await Livreur.updateOne({
            _id: req.params.id
        }, {
            $set: {
                name: name,
                lastname: lastname,
                phone_number: phone_number,
                verified: verified,
                private: private
            }
        })

        res.status(200).send("Data updated")
    } catch (error) {
        res.json({
            message: error
        })
    }
})




// Delete Livreur
route.delete('/:id', async(req, res) => {

    try {

        await Livreur.deleteOne({
            _id: req.params.id
        })

        res.status(200).send("Data deleted")
    } catch (error) {
        res.json({
            message: error
        })
    }
})


// Export routes
module.exports = route;