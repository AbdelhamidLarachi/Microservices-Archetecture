const mongoose = require('mongoose');


const Notification = mongoose.Schema({

    source_id: {
        type: String,
        required: true
    },
    target_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    seen: {
        type: Boolean,
        required: true
    },
})


module.exports = mongoose.model('Notification', Notification);