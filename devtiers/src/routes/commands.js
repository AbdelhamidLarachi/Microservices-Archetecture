const express = require("express");
const router = express.Router();

// Article Model
const Command = require("../models/Command");

// @route GET api/articles
// @desc  GET ALL COMMANDS FOR ONE SPECIFIC RESTAURATEUR
// @access Public
router.get("/:id", (req, res) => {
  Command.find({ restaurateur_id: req.params.id, state: 0 })
    .then((items) => res.status(200).json(items))
    .catch((err) => res.status(400).json(err));
});

// @route PUT api/articles
// @desc  CHANGE STATE OF COMMAND INTO ACCEPTED OR REJECTED
// @access Public
router.put("/:id", (req, res) => {
  const command_id = req.params.id;
  const newState = req.body.newState;
  if (newState == 1) {
    Command.findOne({ _id: command_id })
      .then((doc) => {
        doc.state = 1;
        doc.save();
        res.status(200).json(doc);
      })
      .catch((err) => res.status(400).json(err));
  } else if (newState == 2) {
    Command.findOne({ _id: command_id })
      .then((doc) => {
        doc.state = 2;
        doc.save();
        res.status(200).json(doc);
      })
      .catch((err) => res.status(400).json(err));
  } else {
    res.status(404).json("Erreur statue commande");
  }
});

// @route GET api/articles
// @desc  GET COMMAND HISTORY FOR ONE SPECIFIC RESTAURATEUR
// @access Public
router.get("/history/:id", (req, res) => {
    const myArr = [];
  Command.find({ restaurateur_id: req.params.id })
    .then((items) => {
      items.map((item) => {
        const myObj = {};
        myObj._id = item._id;
        myObj.articles = item.command_Contenu[0].articles;
        myObj.date = item.date;
        myObj.payement_method = item.payement_method;
        myObj.menuName = item.command_Contenu[0].menuName
        myObj.menuPrice = item.command_Contenu[0].menuPrice
        myObj.menuDescription = item.command_Contenu[0].menuDescription
        if (item.state == 1){
            myObj.state = "Commande acceptée"
        }
        else if (item.state == 2){
            myObj.state = "Commande rejetée"
        }
        if(item.state != 0){
            myArr.push(myObj)
        }
      });
      res.status(200).json(myArr);
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
