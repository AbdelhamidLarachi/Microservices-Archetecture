const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Menu = new Schema({
    menuName: {
		type: String,
        required: true
	},
    menuPrice: {
        type: Number,
        required: true
    },
    articles: {
        type: Array,
        required: false
    },
    menuDescription: {
        type: String,
        required: true
    }
})


// Create Schema
const RestaurateurSchema = new Schema({
	name: {
		type: String,
		required: true
	},
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    private: {
        type: Boolean,
        required: true
    },
    credential_id: {
        type: Number,
        required: true
    },
    menus: [Menu]
	
});

module.exports = Restaurateur = mongoose.model('restaurateur', RestaurateurSchema);
