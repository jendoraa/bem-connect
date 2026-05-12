import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="bem">BEM</span><span className="connect"> Connect</span>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/timeline">Timeline</Link></li>
        <li><a href="#contact">Kontak</a></li>
      </ul>
    </nav>
  )
}

export default Navbar