import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', username: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Nama tidak boleh kosong'
    if (!form.username.trim()) errs.username = 'Username tidak boleh kosong'
    else if (form.username.includes(' ')) errs.username = 'Username tidak boleh mengandung spasi'
    else if (form.username.length < 3) errs.username = 'Username minimal 3 karakter'
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    setTimeout(() => {
      const stored = JSON.parse(localStorage.getItem('bc_users') || '[]')
      const exists = stored.find(u => u.username === form.username)
      if (exists) {
        setErrors({ username: 'Username sudah dipakai, coba yang lain!' })
        setLoading(false)
        return
      }

      const newUser = { name: form.name, username: form.username, password: form.password }
      localStorage.setItem('bc_users', JSON.stringify([...stored, newUser]))
      localStorage.setItem('bc_currentUser', JSON.stringify({ username: form.username, name: form.name }))
      navigate('/timeline')
      setLoading(false)
    }, 600)
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
            <label className="form-label">Nama Lengkap</label>
            <input
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              type="text"
              name="name"
              placeholder="Nama kamu..."
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              className={`form-input ${errors.username ? 'input-error' : ''}`}
              type="text"
              name="username"
              placeholder="Username unik kamu..."
              value={form.username}
              onChange={handleChange}
            />
            {errors.username && <span className="form-error">{errors.username}</span>}
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