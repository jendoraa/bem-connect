import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function LandingPage() {
  return (
    <div className="page-wrapper">
      <Navbar />

      {/* Hero Section */}
      <section className="hero" id="hero">
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
            <h3>Cepet Bgt Njir No Cap</h3>
            <p>Akses platform dengan cepat dari device apapun tanpa hambatan.</p>
          </div>
          <div className="feature-card">
            <h3>Bersama kita Mewing</h3>
            <p>Terhubung dengan seluruh anggota BEM Fasilkom UI dalam satu platform.</p>
          </div>
          <div className="feature-card">
            <h3>Sharing Rispek w Bro</h3>
            <p>Sharing kuis, tugas, hingga momen kebersamaan jadi lebih mudah!</p>
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
        <a href="#daftar" className="btn-primary" style={{marginTop: '2.5rem', display: 'inline-block'}}> Mulai Sekarang </a>
      </section>

      <Footer />
    </div>
  )
}

export default LandingPage