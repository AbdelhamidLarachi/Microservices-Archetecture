const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ArticleSchema = new Schema({
	name: {
		type: String,
		required: true
	},
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }
	
});

module.exports = Article = mongoose.model('article', ArticleSchema);
