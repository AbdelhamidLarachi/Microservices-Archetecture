const express = require("express");
const router = express.Router();
const cors = require("cors")

// Json decryption & header cors reading
router.use(cors())
router.use(express.json())
    // Article Model
const Article = require("../../src/models/Articles");

// @route GET api/articles
// @desc  GET ALL Articles
// @access Public
router.get("/:id", (req, res) => {
    Article.find({ restaurateur_id: req.params.id }).then((items) =>
        res.json(items)
    );
});

// @route POST api/articles
// @desc  Create an articles
// @access Public
router.post("/add", (req, res) => {
    const newArticle = new Article({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        restaurateur_id: req.body.restaurateur_id,
    });
    newArticle
        .save()
        .then((item) => res.json({ article: item, success: true }))
        .catch((err) => res.json({ success: false }));
});

// @route DELETE api/articles
// @desc  DELETE a specific Article
// @access Public
router.delete("/:id", (req, res) => {
    Article.findById(req.params.id)
        .then((item) => item.remove().then(() => res.json({ success: true })))
        .catch((err) => res.status(404).json({ success: false }));
});

// @route PUT api/articles
// @desc  EDIT a specific Article
// @access Public

router.put("/:id", (req, res) => {
    const filter = req.params.id;
    const update = req.body;
    Article.findOne({ _id: filter })
        .then((doc) => {
            doc.name = update.name;
            doc.description = update.description;
            doc.price = update.price;
            doc.save();
            res.status(200).json(doc);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});


module.exports = router;