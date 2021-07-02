const express = require("express");
const router = express.Router();

// Restaurateur Model
const Restaurateur = require("../../src/models/Restaurateur");

// @route GET api/Restaurateurs
// @desc  GET ALL Restaurateurs
// @access Public
router.get("/", (req, res) => {
  Restaurateur.find().then((items) => res.json(items));
});


// @route GET api/Restaurateurs
// @desc  GET ONE RESTAURATEUR BY ID
// @access Public
router.get("/:id", (req, res) => {
  Restaurateur.findOne({_id: req.params.id}).then((item) => res.json(item)).catch((err) => console.log(err));
});


// @route POST api/Restaurateurs
// @desc  Create an Restaurateurs
// @access Public
router.post("/add", (req, res) => {
  console.log('ANI HNAA')
  const newRestaurateur = new Restaurateur({
    name: req.body.name,
    description: req.body.description,
    address: req.body.address,
    phone: req.body.phone,
    private: req.body.stats,
    credential_id: 1,
    menus: [],
  });
  console.log(newRestaurateur);
  newRestaurateur.save().then((item) => res.json(item));
});

// @route DELETE api/Restaurateurs
// @desc  DELETE a specific Restaurateur
// @access Public
router.delete("/:id", (req, res) => {
  Restaurateur.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});


// @route POST api/Restaurateurs
// @desc  Create an Restaurateurs
// @access Public
router.post("/menu", (req, res) => {
  // Restaurateur ID
  const restaurateur_id = req.body.restaurateur_id;
  // Create a menu from the request's body
  const menu = {
    menuName: req.body.menuName,
    menuPrice: parseInt(req.body.menuPrice),
    menuDescription: req.body.menuDescription,
    articles: req.body.articles,
  };
  console.log('BODY: ', req.body)
  Restaurateur.findOne({ _id: restaurateur_id })
    .then((record) => {
      record.menus.push(menu);
      record.save().then((r) => {
        var latestMenu = r.menus[r.menus.length - 1];
        res.send(latestMenu);
      });
    })
    .catch((err) => console.log("ERROR:", err));
});

// @route POST api/Restaurateurs
// @desc  GET ALL MENUS OF A SPECIFIC RESTAURATEUR
// @access Public
router.get("/menu/:id", (req, res) => {
  const id = req.params.id;
  Restaurateur.findOne({ _id: id })
    .then((record) => {
      res.json(record.menus);
    })
    .catch((err) => console.log(err));
});

// @route DELETE api/Restaurateurs
// @desc  DELETE a specific Restaurateur
// @access Public
router.delete("/menus/:id", (req, res) => {
  const restaurateur_id = req.body.restaurateur_id;
  const menu_id = req.params.id;
  Restaurateur.findById(restaurateur_id)
    .then((item) => {
      console.log(item.menus);
      item.menus.pull(menu_id);
      item.save().then(() => res.json({ success: true }));
    })
    .catch((err) => res.status(404).json({ success: false }));
});



// @route PUT api/Restaurateurs
// @desc  EDIT a specific Restaurateur's Menu
// @access Public
router.put("/menu/:id", (req, res) => {
  const menu_id = req.params.id;
  const restaurateur_id = req.body.restaurateur_id
  const finalMenu = {
    menuName: req.body.menuName,
    menuPrice: parseInt(req.body.menuPrice),
    menuDescription: req.body.menuDescription,
    articles: req.body.articles
  }
  // console.log('body: ', req.body)
  // console.log('finalMenu: ', finalMenu)
  // console.log('restaurateur_id: ', restaurateur_id)
  // console.log('menu_id: ', menu_id)
  var menuEdited = null; 
  Restaurateur.findOne({ _id: restaurateur_id }).then((rest) => {
    rest.menus.map((menu) => {
      console.log('MENU ID:', menu._id)
      if(menu._id == req.params.id){
        menu.menuName = finalMenu.menuName,
        menu.menuDescription = finalMenu.menuDescription,
        menu.menuPrice = finalMenu.menuPrice,
        menu.articles = finalMenu.articles
      }
      menuEdited = menu;
    })
    rest.save();
    res.status(200).json(menuEdited);
  }).catch((err) => console.log('ERROR: ', err))
});



// @route PUT api/Restaurateurs
// @desc  EDIT a specific Restaurateur
// @access Public
router.put("/:id", (req, res) => {
  // Restaurateur ID
  const restaurateur_id = req.params.id;
  const data = req.body;
  console.log(data, restaurateur_id)
  Restaurateur.findOne({_id: restaurateur_id}).then((doc) => {
    doc.name = data.name;
    doc.description = data.description;
    doc.phone = data.phone;
    doc.address = data.address;
    doc.private = data.stats;
    doc.save();
    res.status(200).json(doc);
  }).catch((err) => {
    res.stats(400).json(err)
  })
});

module.exports = router;