const mongoose = require('mongoose');


export interface ILog {
    //timestamps?: Date;
    userid: number;
    type: string;
    agent: string;
    version?: number;
}

const Log = mongoose.Schema({

    userid: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    agent: {
        type: String,
        required: true
    },
    version: {
        type: Number,
        required: false
    }
}, 

{timestamps: true})


// declare model
const log = mongoose.model('Log', Log);

// return model
const build = (attr: ILog) => {
    return new log(attr);
}


/* testing interface ILog */
build({
    //timestamps: new Date(),
    userid: 2,
    type: "",
    agent: "xxx",
    version: 1.1
})



module.exports = log;
