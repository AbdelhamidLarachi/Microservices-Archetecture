const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const NotificationSchema = new Schema({
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

module.exports = Notification = mongoose.model('notification', NotificationSchema);