const mongoose = require('mongoose');

// Create Schema
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
        required: true
    },
    description: {
        type: String,
        required: true
    },
    seen: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Notification', Notification);