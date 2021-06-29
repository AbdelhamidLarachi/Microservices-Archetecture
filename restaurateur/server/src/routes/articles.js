const express = require('express');
const router = express.Router();

// Article Model
const Article = require('../../src/models/Articles');

// @route GET api/articles
// @desc  GET ALL Articles
// @access Public
router.get('/', (req, res) => {
	Article.find().then((items) => res.json(items));
});

router.get('/test', (req, res) => {
	res.status(200).json({test: 'working'})
})


// @route POST api/articles
// @desc  Create an articles
// @access Public
router.post('/add', (req, res) => {
	const newArticle = new Article({
		name: req.body.name,
        description: req.body.description,
        price: req.body.price
	});
	newArticle.save().then((item) => res.json(item));
});

module.exports = router;
