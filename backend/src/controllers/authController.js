const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { createUser, findUserByEmail, findUserByUsername } = require('../models/userModel')

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const existingEmail = await findUserByEmail(email)
    if (existingEmail) return res.status(400).json({ message: 'Email sudah dipakai!' })

    const existingUsername = await findUserByUsername(username)
    if (existingUsername) return res.status(400).json({ message: 'Username sudah dipakai!' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await createUser(username, email, hashedPassword)

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({ token, user: { id: user.id, username: user.username, email: user.email } })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await findUserByUsername(username)
    if (!user) return res.status(400).json({ message: 'Username tidak ditemukan!' })

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(400).json({ message: 'Password salah!' })

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({ token, user: { id: user.id, username: user.username, email: user.email } })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { register, login }