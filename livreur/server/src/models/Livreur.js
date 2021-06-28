const mongoose = require('mongoose');


const Livreur = mongoose.Schema({

    credential_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: false
    },
    phone_number: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    verified: {
        type: Boolean,
        required: true
    },
    private: {
        type: Boolean,
        required: true
    },
})


module.exports = mongoose.model('Livreur', Livreur);