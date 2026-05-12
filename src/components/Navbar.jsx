import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const currentUser = JSON.parse(localStorage.getItem('bc_currentUser') || 'null')

  const handleLogout = () => {
    localStorage.removeItem('bc_currentUser')
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="bem">BEM</span><span className="connect"> Connect</span>
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/timeline">Timeline</Link></li>
        {currentUser ? (
          <>
            <li className="navbar-user">{currentUser.username}</li>
            <li>
              <button className="navbar-logout-btn" onClick={handleLogout}>Keluar</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" className="navbar-login-btn">Masuk</Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar