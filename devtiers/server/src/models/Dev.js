const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const DevSchema = new Schema({
	name: {
		type: String,
		required: true
	},
    phone: {
        type: String,
        required: false
    },
    credential_id: {
        type: Number,
        required: true
    },
});

module.exports = Dev = mongoose.model('dev', DevSchema);
