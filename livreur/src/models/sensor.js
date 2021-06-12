const mongoose = require('mongoose');

const Sensor = mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    datas: {
        type: Array,
        required: true
    },
    metrics: {
        type: Boolean,
        required: false
    }
})


module.exports = mongoose.model('Sensor', Sensor);
