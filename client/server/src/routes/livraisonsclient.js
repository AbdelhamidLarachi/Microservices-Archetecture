const express = require("express");
const router = express.Router();
const cors = require("cors")

// Json decryption & header cors reading
router.use(cors())
router.use(express.json())
    // Article Model
const Livraison = require("../../src/models/LivraisonsClient");

router.get("/livraison/:id", (req, res) => {
    Livraison.find({ id_client: req.params.id }).sort({_id:-1}).limit(1).then((response) => {
        res.send(response)
    }).catch((err) => {
        console.log(err)
    })
})

// @route GET api/articles
// @desc  GET ALL Articles
// @access Public
router.get("/:id", (req, res) => {
    const myArr = [];
    Livraison.find({ id_client: req.params.id }).then((items) => {
        items.map((item) => {
            const order = {};
            order.date = item.date;
            order._id = item._id;
            order.articles = item.articles;
            order.client_address = item.client_address;
            order.client_name = item.client_name;
            order.client_phone = item.client_phone;
            order.date = item.date;
            order.id_client = item.id_client;
            order.id_livreur = item.id_livreur;
            order.id_restaurateur = item.id_restaurateur;
            order.livreur_name = item.livreur_name;
            order.livreur_phone = item.livreur_phone;
            order.prix = item.prix;
            order.restaurateur_address = item.restaurateur_address;
            order.restaurateur_name = item.restaurateur_name;
            order.restaurateur_phone = item.restaurateur_phone;
            if (item.state == 0) {
                order.state = "En cours de livaison"
            } else if (item.state == 1) {
                order.state = "Livraison terminée"
            }
            myArr.push(order);
        })
        res.status(200).json(myArr)
    }).catch((err) => res.status(400).json(err))
});

module.exports = router;