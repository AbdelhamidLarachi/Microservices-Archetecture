const mongoose = require('mongoose');
const CommandSchema = mongoose.Schema({
    id_restaurateur: {
        type: String,
        required: true
    },
    id_client: {
        type: String,
        required: true
    },
    state: {
        type: Number,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    payement_method: {
        type: String,
        required: true
    },
})
module.exports = Command = mongoose.model('commande', CommandSchema);