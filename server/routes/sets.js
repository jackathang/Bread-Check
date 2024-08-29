const express = require('express');
const {getAllSets, getSingleSet, createSet, deleteSet, updateSet} = require('../controllers/setController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

// requires user login to access api
router.use(requireAuth)

// get all sets
router.get('/', getAllSets)

// get a single set
router.get('/:id', getSingleSet)

//  POST a new set
router.post('/', createSet);

//DELETE a set
router.delete('/:id', deleteSet)

// UPDATE / PUT a set
router.patch('/:id', updateSet)

module.exports = router