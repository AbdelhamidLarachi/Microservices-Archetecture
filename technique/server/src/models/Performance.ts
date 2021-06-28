const mongoose = require('mongoose');


export interface IPerformance {
    //timestamps?: Date;
    platform: string,
    port: number,
    cPUs: number,
    loadAverage5s: number,
    totalMemoryMB: number,
    freeMemoryMB: number,
    freeMemoryPercent: number,
    sysUptime: number
}

const Performance = mongoose.Schema({

    platform: {
        type: String,
        required: true
    },
    port: {
        type: Number,
        required: true
    },
    loadAverage5s: {
        type: Number,
        required: true
    },
    totalMemoryMB: {
        type: Number,
        required: false
    },
    freeMemoryMB: {
        type: Number,
        required: false
    },
    freeMemoryPercent: {
        type: Number,
        required: false
    },
    sysUptime: {
        type: Number,
        required: false
    }
},

    { timestamps: true })


module.exports = mongoose.model('Performance', Performance);
