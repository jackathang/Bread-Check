const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const { isIdValid } = require('./setController')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d'});
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        // create token
        const token = createToken(user._id);
        
        res.status(200).json({username: user.username, email, token, _id:user._id, theme: user.theme});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup user
const signupUser = async (req, res) => {
    const { username, email, password } = req.body
    
    try {
        const user = await User.signup(username, email, password)

        // create token
        const token = createToken(user._id);
        
        res.status(200).json({username, email, token, _id:user._id, theme: user.theme});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// update user
const updateUser = async (req, res) => {
    const { id } = req.params;

    const validId = isIdValid(id, res);

    if (validId) {
        
        const user = await User.findByIdAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        );

        if (!user) {
            return res.status(400).json({ error: 'Account does not exist' });
        }

        const token = createToken(user._id);
        const { username, email, _id, theme} = user;
        res.status(200).json({username, email, token, _id, theme});
    }
}

const matchEmail = async (req, res) => {
    const { email : sharedEmail } = req.body

    try {
        const user = await User.findOne({ email : sharedEmail })
        if (!user) { return res.status(404).json({error: 'This email is not tied to an account.'})}

        const { _id, username, email, theme } = user;
        res.status(200).json({ _id, username, email, theme })
    } catch (error) {
        res.status(400).json({error: error.message})
    }   
}


module.exports = {
    loginUser,
    signupUser,
    matchEmail,
    updateUser
}