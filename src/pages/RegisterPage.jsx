import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../api/auth'

function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const errs = {}
    if (!form.username.trim()) errs.username = 'Username tidak boleh kosong'
    else if (form.username.includes(' ')) errs.username = 'Username tidak boleh mengandung spasi'
    else if (form.username.length < 3) errs.username = 'Username minimal 3 karakter'
    if (!form.email.trim()) errs.email = 'Email tidak boleh kosong'
    else if (!form.email.includes('@')) errs.email = 'Email tidak valid'
    if (!form.password) errs.password = 'Password tidak boleh kosong'
    else if (form.password.length < 6) errs.password = 'Password minimal 6 karakter'
    if (!form.confirmPassword) errs.confirmPassword = 'Konfirmasi password wajib diisi'
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Password tidak cocok'
    return errs
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    try {
      const data = await register(form.username, form.email, form.password)
      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('bc_currentUser', JSON.stringify(data.user))
        navigate('/timeline')
      } else {
        setErrors({ general: data.message || 'Registrasi gagal!' })
      }
    } catch (err) {
      setErrors({ general: 'Server error, coba lagi!' })
    }
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <h1><span className="bem">BEM</span><span className="connect"> Connect</span></h1>
          <p>Buat akun baru</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              className={`form-input ${errors.username ? 'input-error' : ''}`}
              type="text"
              name="username"
              placeholder="Username kamu..."
              value={form.username}
              onChange={handleChange}
            />
            {errors.username && <span className="form-error">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              type="email"
              name="email"
              placeholder="Email kamu..."
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              type="password"
              name="password"
              placeholder="Minimal 6 karakter..."
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Konfirmasi Password</label>
            <input
              className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
              type="password"
              name="confirmPassword"
              placeholder="Ulangi password kamu..."
              value={form.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? <span className="btn-spinner" /> : 'Daftar'}
          </button>
        </form>

        <p className="auth-switch">
          Udah punya akun?{' '}
          <Link to="/login" className="auth-link">Masuk di sini</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage