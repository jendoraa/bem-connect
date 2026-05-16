import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import speedIcon from '../assets/fast.jpeg'
import peopleIcon from '../assets/community.jpeg'
import smartIcon from '../assets/cerdas.jpeg'

function LandingPage() {
  const navigate = useNavigate()
  const currentUser = JSON.parse(localStorage.getItem('bc_currentUser') || 'null')
  return (
    <div className="page-wrapper">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Selamat Datang di <span className="bem">BEM</span><span className="connect"> Connect</span></h1>
          <p>Platform khusus untuk ngepost hal hal seru di BEM</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <h2>Kenapa BEM Connect?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img src={speedIcon} alt="cepat" className="feature-icon" />
            <h3>Terakses dengan Cepat</h3>
          </div>
          <div className="feature-card">
            <img src={peopleIcon} alt="kebersamaan" className="feature-icon" />
            <h3>Terhubung Lebih Dekat</h3>
          </div>
          <div className="feature-card">
            <img src={smartIcon} alt="cerdas" className="feature-icon" />
            <h3>Tumbuh & Berkembang</h3>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works" id="how-it-works">
        <h2>Cara Pakai BEM Connect</h2>
        <p className="section-subtitle">Mulai terhubung dengan 3 langkah mudah</p>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3>Daftar Akun</h3>
              <p>Buat akun menggunakan email UI kamu dan lengkapi profilmu</p>
            </div>
          </div>
          <div className="step-divider">→</div>
          <div className="step-card">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3>Explore Timeline</h3>
              <p>Lihat postingan terbaru dari seluruh anggota</p>
            </div>
          </div>
          <div className="step-divider">→</div>
          <div className="step-card">
            <div className="step-number">03</div>
            <div className="step-content">
              <h3>Mulai Posting</h3>
              <p>Bagikan momen seru kamu ke seluruh anggota</p>
            </div>
          </div>
        </div>
        <button className="btn-primary" onClick={() => navigate(currentUser ? '/timeline' : '/login')} style={{marginTop: '3rem'}}>
          Mulai Sekarang
        </button>
      </section>

      <Footer />
    </div>
  )
}

export default LandingPage