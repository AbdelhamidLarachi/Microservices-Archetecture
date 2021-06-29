const mongoose = require('mongoose');


const CommandSchema = mongoose.Schema({

    
   
    restaurateur_id: {
        type: String,
        required: true
    },
    client_id: {
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
    
    command_Contenu: {
        type: Array,
        required: true
    },
})

module.exports = Command = mongoose.model('commande', CommandSchema);

// module.exports = Restaurateur = mongoose.model('restaurateur', RestaurateurSchema);

