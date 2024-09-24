const express = require('express')
const router = express.Router()
const { authenticateUser } = require('../middlewares/authentication')
const { getAllArticles, markAsRead, toggleFavourite } = require('../controllers/articleController')

// Get all articles
router.get('/', getAllArticles)

// Mark an article as read (protected route)
router.put('/:id/read', authenticateUser, markAsRead);

router.put('/:id/favourite', authenticateUser,toggleFavourite);

module.exports = router