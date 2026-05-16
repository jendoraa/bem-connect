const express = require('express')
const router = express.Router()
const upload = require('../config/multer')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Tidak ada file!' })
  const protocol = req.protocol
  const host = req.get('host')
  const imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`
  res.json({ url: imageUrl })
})

module.exports = router