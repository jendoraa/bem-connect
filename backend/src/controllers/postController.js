const { getAllPosts, createPost, updatePost, deletePost, likePost, unlikePost } = require('../models/postModel')

const getPosts = async (req, res) => {
  try {
    const posts = await getAllPosts()
    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

const addPost = async (req, res) => {
  try {
    const { text, image } = req.body
    const { id, username } = req.user
    const post = await createPost(id, username, text, image)
    res.status(201).json(post)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

const editPost = async (req, res) => {
  try {
    const { id } = req.params
    const { text } = req.body
    const post = await updatePost(id, text)
    res.json(post)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

const removePost = async (req, res) => {
  try {
    const { id } = req.params
    await deletePost(id)
    res.json({ message: 'Post berhasil dihapus!' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

const likeAPost = async (req, res) => {
  try {
    const { id } = req.params
    const post = await likePost(id)
    res.json(post)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

const unlikeAPost = async (req, res) => {
  try {
    const { id } = req.params
    const post = await unlikePost(id)
    res.json(post)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { getPosts, addPost, editPost, removePost, likeAPost, unlikeAPost }