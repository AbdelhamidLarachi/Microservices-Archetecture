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


// @route DELETE api/articles
// @desc  DELETE a specific Article
// @access Public
router.delete('/:id', (req, res) => {
	Article.findById(req.params.id)
		.then((item) => item.remove().then(() => res.json({ success: true })))
		.catch((err) => res.status(404).json({ success: false }));
});


module.exports = router;
