const mongoose = require('mongoose');


export interface IComponent {
    name: string;
    description: string;
    category: string;
    subCategory?: string;
    sourceCode: string;
    npm: string;
    jsLibrary?: string;
}


const Component = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: false
    },
    sourceCode: {
        type: String,
        required: false
    },
    npm: {
        type: String,
        required: true
    },
    jsLibrary: {
        type: String,
        required: false
    }
})



module.exports = mongoose.model('Component', Component);
