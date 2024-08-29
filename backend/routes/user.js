const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')
const {loginUser, signupUser, matchEmail, updateUser} = require('../controllers/userController')

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// --------------------
// authenticated routes
router.use(requireAuth)

// matchEmail route
router.post('/matchemail', matchEmail)

router.patch('/:id', updateUser)


module.exports = router