const mongoose = require('mongoose');


const Client = mongoose.Schema({

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
        type: String,
        required: true
    },
    
    address:{
        type:String,
        required: true
    },

    suspended:{

    type:Boolean,
    required: true


    }

    
})


module.exports = mongoose.model('Client', Client);