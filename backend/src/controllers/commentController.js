const { getCommentsByPost, createComment, createReply, deleteComment } = require('../models/commentModel')

const getComments = async (req, res) => {
  try {
    const { post_id } = req.params
    const comments = await getCommentsByPost(post_id)
    res.json(comments)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

const addComment = async (req, res) => {
  try {
    const { post_id } = req.params
    const { text } = req.body
    const { id, username } = req.user
    const comment = await createComment(post_id, id, username, text)
    res.status(201).json(comment)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

const addReply = async (req, res) => {
  try {
    const { comment_id } = req.params
    const { text } = req.body
    const { id, username } = req.user
    const reply = await createReply(comment_id, id, username, text)
    res.status(201).json(reply)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

const removeComment = async (req, res) => {
  try {
    const { id } = req.params
    await deleteComment(id)
    res.json({ message: 'Komentar berhasil dihapus!' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { getComments, addComment, addReply, removeComment }