function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="bem">BEM</span><span className="connect"> Connect</span>
      </div>
      <ul className="navbar-links">
        <li><a href="#hero">Home</a></li>
        <li><a href="#features">Fitur</a></li>
        <li><a href="#contact">Kontak</a></li>
      </ul>
    </nav>
  )
}

export default Navbar