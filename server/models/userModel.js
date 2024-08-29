const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userTheme = new Schema({
    lightMode : {
        type: Boolean,
        default: true
    },
    accentColor : {
        type: String,
        default : 'blue'
    }
})

// user schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    theme: {
        type: userTheme,
        required: false
    }

}, { timestamps: true});

// static signup method
// creates custom mongoose hook / function for handling database data
userSchema.statics.signup = async function(username, email, password) {

    // validation
    if (!email || !password || !username) {
        throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough');
    }
    
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error('Email is already in use')
    }

    // generated salt, a string of characters added to password.
    // if user password gets cracked on one site, it isn't the "same" as everywhere else
    const salt = await bcrypt.genSalt(10);
    // hashes the salted password
    const hash = await bcrypt.hash(password, salt);

    // creates document in database
    const user = await this.create({ username, email , password: hash, theme: {} });

    return user;
}

// custom schema hook to log user in
userSchema.statics.login = async function(email, password) {
    // validation
    if (!email || !password) {
        throw Error('All fields must be filled');
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw Error('Email is not registered to an account')
    }

    // compares the password called, and password tied to user
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }

    return user;
}

module.exports = mongoose.model('User', userSchema);