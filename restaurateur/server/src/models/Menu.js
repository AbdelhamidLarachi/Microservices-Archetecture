const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MenuSchema = new Schema({
	menuName: {
		type: String,
	},
    menuPrice: {
        type: Number
    },
    articles: {
        type: Array
    },
    menuDescription: {
        type: String,
        required: true
    }
});

module.exports = Menu = mongoose.model('menu', MenuSchema);