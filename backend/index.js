require('dotenv').config()
const app = require('./src/app')
const { createUsersTable } = require('./src/models/userModel')
const { createPostsTable } = require('./src/models/postModel')

const PORT = process.env.PORT || 5000

const start = async () => {
  try {
    await createUsersTable()
    await createPostsTable()
    console.log('Database tables ready!')

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Server error:', error)
  }
}

start()