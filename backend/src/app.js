const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')
const path = require('path')
const uploadRoutes = require('./routes/uploadRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/upload', uploadRoutes)

module.exports = app