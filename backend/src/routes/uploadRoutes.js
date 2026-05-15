const express = require('express')
const router = express.Router()
const upload = require('../config/multer')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Tidak ada file!' })
  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`
  res.json({ url: imageUrl })
})

module.exports = router