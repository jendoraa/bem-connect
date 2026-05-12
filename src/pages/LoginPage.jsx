import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const errs = {}
    if (!form.username.trim()) errs.username = 'Username tidak boleh kosong'
    if (!form.password) errs.password = 'Password tidak boleh kosong'
    else if (form.password.length < 6) errs.password = 'Password minimal 6 karakter'
    return errs
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    setTimeout(() => {
      const stored = JSON.parse(localStorage.getItem('bc_users') || '[]')
      const user = stored.find(u => u.username === form.username && u.password === form.password)
      if (user) {
        localStorage.setItem('bc_currentUser', JSON.stringify({ username: user.username, name: user.name }))
        navigate('/timeline')
      } else {
        setErrors({ general: 'Username atau password salah!' })
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <h1><span className="bem">BEM</span><span className="connect"> Connect</span></h1>
          <p>Masuk ke akunmu</p>
        </div>

        {errors.general && (
          <div className="auth-alert">{errors.general}</div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              className={`form-input ${errors.username ? 'input-error' : ''}`}
              type="text"
              name="username"
              placeholder="Masukkan username..."
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
            />
            {errors.username && <span className="form-error">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              type="password"
              name="password"
              placeholder="Masukkan password..."
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? <span className="btn-spinner" /> : 'Masuk'}
          </button>
        </form>

        <p className="auth-switch">
          Belum punya akun?{' '}
          <Link to="/register" className="auth-link">Daftar sekarang</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage