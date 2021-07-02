const express = require('express');
const router = express.Router();

// Dev Model
const Dev = require('../../src/models/Dev');

// @route POST api/Devs
// @desc  Create a new developer
// @access Public
router.post('/add', (req, res) => {

	// **** FOR SQL **** \\
	// const email = req.body.email;
	// const password = req.body.password;
	// **** FOR SQL **** \\
	const newDev = new Dev({
		name: req.body.name,
        phone: req.body.phone,
		credential_id: 1
	});
	newDev.save().then((item) => res.status(200).json(item));
});



// @route POST api/Devs
// @desc  Log in
// @access Public
router.post('/login', (req, res) => {
	console.log(req.body)
	// **** FOR SQL **** \\
	// const email = req.body.email;
	// const password = req.body.password;
	// **** FOR SQL **** \\

	res.status(200).json({success: true});
});


// @route GET api/Devs
// @desc  Log in
// @access Public
router.get('/:credential_id', (req, res) => {
	const cred = req.params.credential_id;
	console.log(req.params.credential_id)
	Dev.findOne({credential_id: cred}).then((doc) => {
		console.log(doc);
		res.status(200).json({doc});
	}).catch((err) => res.status(400).json(err))
});


// @route PUT api/Devs
// @desc  Edits a specific dev
// @access Public
router.put('/:credential_id', (req, res) => {
	const cred = req.params.credential_id;
	Dev.findOne({credential_id: cred}).then((doc) => {
		doc.name = req.body.name;
		doc.phone = req.body.phone;
		doc.phone = req.body.phone;
		doc.save();
		res.status(200).json({doc});
	}).catch((err) => res.status(400).json(err))
});



module.exports = router;
