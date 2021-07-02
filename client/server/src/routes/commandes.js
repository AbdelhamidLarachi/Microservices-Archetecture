const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require("cors")

// Json decryption & header cors reading
router.use(cors())
router.use(express.json())
    // const cors = require("cors")


// router.use(cors())
router.use(bodyParser.json())

// Article Model

const Commande = require("../models/Commande");
const Notification = require("../models/Notification");


// @GET Commande 
router.get('/:id', (req, res) => {
    Commande.find({ id_client: req.params.id }).sort({_id:-1}).limit(1).then((doc) => {
        res.send(doc)
    }).catch((err) => {
        console.log(err)
    })
})

router.post('/add', (req, res) => {

    console.log(req.body)
    const newCommande = new Commande({
        id_restaurateur: req.body.restaurateur_id,
        restaurateur_name: req.body.restaurateur_name,
        restaurateur_address: req.body.restaurateur_address,
        restaurateur_phone: req.body.restaurateur_phone,
        id_client: req.body.id_client,
        client_name: req.body.client_name,
        client_phone: req.body.client_phone,
        client_address: req.body.client_address,
        state: req.body.state,
        prix: req.body.prix,
        date: req.body.date,
        menu: req.body.menu,
        payement_method: req.body.payement_method,
        articles: req.body.articles


    });
    try {
        newCommande.save().then((item) => res.json(item));

        const newNotification = new Notification({
            source_id: req.body.id_client,
            target_id: req.body.restaurateur_id,
            title: ' ',
            description: ' ',
            seen: false
        });
        newNotification
            .save()
            .then((item) => console.log(item))
            .catch((err) => console.log(err));
    } catch (err) {
        res.json(err)
    }


})

// Update Commande

router.patch('/:id', async(req, res) => {

    const {
        _id,
        restaurateur_id,
        client_id,
        state,
        date,
        payement_method,
        command_Contenu
    } = req.body

    try {
        await Commande.updateOne({
            _id: req.params.id
        }, {
            $set: {

                state: state,
                date: date,
                payement_method: payement_method,
                command_Contenu: command_Contenu
            }
        })

        res.status(200).send("Data updated")
    } catch (error) {
        res.json({
            message: error
        })
    }
})




// Delete Commande
router.delete('/:id', async(req, res) => {

    try {

        await Commande.deleteOne({
            _id: req.params.id
        })

        res.status(200).send("Data deleted")
    } catch (error) {
        res.json({
            message: error
        })
    }
})

//  Historique des Commandes

// @route GET api/commandes
// @desc  GET COMMAND HISTORY FOR ONE SPECIFIC CLIENT
// @access Public

router.get("/history/:id", (req, res) => {
    const myArr = [];
    Commande.find({ id_client: req.params.id })
        .then((items) => {
            //   items.map((item) => {
            //     const myObj = {};
            //     myObj._id = item._id;
            //     myObj.articles = item.command_Contenu[0].articles;
            //     myObj.date = item.date;
            //     myObj.payement_method = item.payement_method;
            //     myObj.menuName = item.command_Contenu[0].menuName
            //     myObj.menuPrice = item.command_Contenu[0].menuPrice
            //     myObj.menuDescription = item.command_Contenu[0].menuDescription
            //     if (item.state == 1){
            //         myObj.state = "Commande acceptée"
            //     }
            //     else if (item.state == 2){
            //         myObj.state = "Commande rejetée"
            //     }
            //     if(item.state != 0){
            //         myArr.push(myObj)
            //     }
            //   });
            res.send(items);
        })
        .catch((err) => res.status(400).json(err));
});


module.exports = router;