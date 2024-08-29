// functions that handle data to and from database
const mongoose = require('mongoose');

// model / schema for finance sheets / sets
const Set = require('../models/setModel')

// checks and returns whether id is valid
const isIdValid = (id, res) => {
    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'No set exists'});
        return false;
    }
    return true;
}

// get all sets
const getAllSets = async (req, res) => {
    const owner_id = req.user._id
    try {
        // sorts by newest ones, find({}) are parameters to search for
        const sets = await Set.find({
            $or: [
                { owner_id },
                { "shared_users._id" : owner_id }
            ]
        }).sort({ createdAt: -1 });
        res.status(200).json(sets);
    } catch (error) {
        res.status(400).json({error}) 
    }
}

// get a single set
const getSingleSet = async (req, res) => {
    const { id } = req.params;

    const validId = isIdValid(id, res);

    if (validId) {
        const set = await Set.findById(id);

        if (!set) {
            return res.status(400).json({error: 'set does not exist'})
        }
    
        res.status(200).json(set)
    }    
}

// create a new set
const createSet = async (req, res) => {
    const {title, completed, goal, units, owner_username, owner_id, owner_color} = req.body

    // add document to database
    try {
        const set = await Set.create({title, completed, goal, units, owner_username, owner_id, owner_color, shared_user_ids: []})
        res.status(200).json(set)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
;}

// delete a set
const deleteSet = async (req, res) => {
    const { id } = req.params;

    const validId = isIdValid(id, res);

    if (validId) {
        const set = await Set.findOneAndDelete({ _id: id});

        if (!set) {
            return res.status(400).json({error: 'set does not exist'})
        }
    
        res.status(200).json(set)
    }  
}

// update a set
const updateSet = async (req, res) => {
    const { id } = req.params;

    const validId = isIdValid(id, res);

    if (validId) {
        const set = await Set.findByIdAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        );

        if (!set) {
            return res.status(400).json({ error: 'set does not exist' });
        }

        res.status(200).json(set);
    }
};


module.exports = {
    getAllSets,
    getSingleSet,
    createSet,
    deleteSet,
    updateSet,
    isIdValid
}