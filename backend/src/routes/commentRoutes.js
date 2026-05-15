const express = require('express')
const router = express.Router()
const { getComments, addComment, addReply, removeComment } = require('../controllers/commentController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/:post_id', getComments)
router.post('/:post_id', authMiddleware, addComment)
router.post('/reply/:comment_id', authMiddleware, addReply)
router.delete('/:id', authMiddleware, removeComment)

module.exports = router