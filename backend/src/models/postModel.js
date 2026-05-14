const pool = require('../config/db')

const createPostsTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      username VARCHAR(50) NOT NULL,
      text TEXT,
      image TEXT,
      likes INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `)
}

const getAllPosts = async () => {
  const result = await pool.query('SELECT * FROM posts ORDER BY created_at ASC')
  return result.rows
}

const createPost = async (user_id, username, text, image) => {
  const result = await pool.query(
    'INSERT INTO posts (user_id, username, text, image) VALUES ($1, $2, $3, $4) RETURNING *',
    [user_id, username, text, image]
  )
  return result.rows[0]
}

const updatePost = async (id, text) => {
  const result = await pool.query(
    'UPDATE posts SET text = $1 WHERE id = $2 RETURNING *',
    [text, id]
  )
  return result.rows[0]
}

const deletePost = async (id) => {
  await pool.query('DELETE FROM posts WHERE id = $1', [id])
}

const likePost = async (id) => {
  const result = await pool.query(
    'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *',
    [id]
  )
  return result.rows[0]
}

const unlikePost = async (id) => {
  const result = await pool.query(
    'UPDATE posts SET likes = GREATEST(likes - 1, 0) WHERE id = $1 RETURNING *',
    [id]
  )
  return result.rows[0]
}

module.exports = { createPostsTable, getAllPosts, createPost, updatePost, deletePost, likePost, unlikePost }