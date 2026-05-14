const express = require('express')
const router = express.Router()
const { getPosts, addPost, editPost, removePost, likeAPost, unlikeAPost } = require('../controllers/postController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', getPosts)
router.post('/', authMiddleware, addPost)
router.put('/:id', authMiddleware, editPost)
router.delete('/:id', authMiddleware, removePost)
router.put('/:id/like', authMiddleware, likeAPost)
router.put('/:id/unlike', authMiddleware, unlikeAPost)

module.exports = router