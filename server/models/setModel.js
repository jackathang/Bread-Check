const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// schema for the unit in set / sheet
// child
const unitSchema = new Schema({
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
    },
    owner_id: {
        type: String
    }
})

// schema for shared users
const sharedUserSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    color : {
        type: String,
        default : 'blue',
        required: true
    },
})

// Full set / sheet
// parent
const setSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Number
    },
    goal: {
        type: Number
    },
    units: {
        type: [unitSchema],
        required: true
    },

    owner_username: {
        type: String,
        required: true
    },
    owner_id: {
        type: String,
        required: true
    },
    owner_color: {
        type: String,
        required: true
    },
    shared_users: {
        type: [sharedUserSchema],
        required: false
    }
    
}, { timestamps: true});



module.exports = mongoose.model('Set', setSchema);