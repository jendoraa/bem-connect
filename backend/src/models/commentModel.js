const pool = require('../config/db')

const createCommentsTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      username VARCHAR(50) NOT NULL,
      text TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `)
}

const createRepliesTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS replies (
      id SERIAL PRIMARY KEY,
      comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      username VARCHAR(50) NOT NULL,
      text TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `)
}

const getCommentsByPost = async (post_id) => {
  const comments = await pool.query(
    'SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC',
    [post_id]
  )
  const replies = await pool.query(
    `SELECT r.* FROM replies r
     JOIN comments c ON r.comment_id = c.id
     WHERE c.post_id = $1 ORDER BY r.created_at ASC`,
    [post_id]
  )
  return comments.rows.map(comment => ({
    ...comment,
    replies: replies.rows.filter(r => r.comment_id === comment.id)
  }))
}

const createComment = async (post_id, user_id, username, text) => {
  const result = await pool.query(
    'INSERT INTO comments (post_id, user_id, username, text) VALUES ($1, $2, $3, $4) RETURNING *',
    [post_id, user_id, username, text]
  )
  return { ...result.rows[0], replies: [] }
}

const createReply = async (comment_id, user_id, username, text) => {
  const result = await pool.query(
    'INSERT INTO replies (comment_id, user_id, username, text) VALUES ($1, $2, $3, $4) RETURNING *',
    [comment_id, user_id, username, text]
  )
  return result.rows[0]
}

const deleteComment = async (id) => {
  await pool.query('DELETE FROM comments WHERE id = $1', [id])
}

module.exports = { createCommentsTable, createRepliesTable, getCommentsByPost, createComment, createReply, deleteComment }