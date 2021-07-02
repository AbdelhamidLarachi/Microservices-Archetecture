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
    
    menu: {
        type: String,
        required: true
    },
    articles: {
        type: Array,
        required: true
    },
    prix: {
        type: Number,
        required: true
    },
    payement_method: {
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



























// const mongoose = require('mongoose');


// const CommandeSchema = mongoose.Schema({

    
   
//     restaurateur_id: {
//         type: String,
//         required: true
//     },
//     client_id: {
//         type: String,
//         required: true
//     },
//     state: {
//         type: Number,
//         required: false
//     },
//     date: {
//         type: Date,
//         required: true
//     },
//     payement_method: {
//         type: String,
//         required: true
//     },
    
//     command_Contenu: {
//         type: Array,
//         required: true
//     },
// })

// module.exports = Commande = mongoose.model('commande', CommandeSchema);

// // module.exports = Restaurateur = mongoose.model('restaurateur', RestaurateurSchema);

