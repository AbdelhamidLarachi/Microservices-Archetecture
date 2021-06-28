const mongoose = require('mongoose');


const Commande = mongoose.Schema({

    id_restaurateur: {
        type: String,
        required: true
    },
    restaurateur_name: {
        type: String,
        required: true
    },
    restaurateur_address: {
        type: String,
        required: true
    },
    restaurateur_phone: {
        type: String,
        required: true
    },
    id_client: {
        type: String,
        required: true
    },
    client_name: {
        type: String,
        required: true
    },
    client_address: {
        type: String,
        required: true
    },
    client_phone: {
        type: String,
        required: true
    },
    articles: {
        type: Array,
        required: true
    },
    prix: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    state: {
        type: Number,
        required: true
    },
})


module.exports = mongoose.model('Commande', Commande);