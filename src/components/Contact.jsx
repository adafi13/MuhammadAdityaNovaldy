const WA_LINK =
  'https://wa.me/6285156412702?text=Halo,%20saya%20Muhammad%20Aditya%20Novaldy.%20Saya%20ingin%20menghubungi%20melalui%20portofolio.';

export default function Contact() {
  return (
    <section id="contact" className="section container">
      <p className="section-label reveal">Kontak</p>
      <h2 className="section-title reveal">
        <i className="fa-solid fa-paper-plane"></i> Mari Terhubung
        <svg className="title-deco" viewBox="0 0 60 12" fill="none">
          <path d="M2 6 Q15 0 28 6 T58 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </h2>
      <div className="row g-4 justify-content-center" style={{ marginTop: '.6rem' }}>
        <div className="col-lg-3 col-md-6 col-6">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener"
            className="card reveal"
            style={{ textAlign: 'center', display: 'block', textDecoration: 'none', height: '100%' }}
          >
            <i className="fa-brands fa-whatsapp" style={{ color: '#25D366', marginBottom: '1rem' }}></i>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text)' }}>WhatsApp</h3>
            <p className="muted" style={{ margin: 0, fontSize: '0.85rem' }}>
              +62 851-5641-2702
            </p>
            <span
              style={{
                display: 'inline-block',
                marginTop: '1.2rem',
                color: 'var(--accent-bright)',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Chat &rarr;
            </span>
          </a>
        </div>
        <div className="col-lg-3 col-md-6 col-6">
          <a
            href="mailto:adityanovaldy721@gmail.com?subject=Kontak%20Portofolio&body=Halo, saya Muhammad Aditya Novaldy.%0ASaya ingin menghubungi melalui portofolio."
            className="card reveal"
            style={{ textAlign: 'center', display: 'block', textDecoration: 'none', height: '100%' }}
          >
            <i className="fa-solid fa-envelope" style={{ color: 'var(--accent-bright)', marginBottom: '1rem' }}></i>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text)' }}>Email</h3>
            <p className="muted" style={{ margin: 0, fontSize: '0.85rem', wordBreak: 'break-all' }}>
              adityanovaldy721
              <br />
              @gmail.com
            </p>
            <span
              style={{
                display: 'inline-block',
                marginTop: '1.2rem',
                color: 'var(--accent-bright)',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Pesan &rarr;
            </span>
          </a>
        </div>
        <div className="col-lg-3 col-md-6 col-6">
          <a
            href="https://id.linkedin.com/in/m-aditya-novaldy-93437023a"
            target="_blank"
            rel="noopener"
            className="card reveal"
            style={{ textAlign: 'center', display: 'block', textDecoration: 'none', height: '100%' }}
          >
            <i className="fa-brands fa-linkedin" style={{ color: '#0A66C2', marginBottom: '1rem' }}></i>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text)' }}>LinkedIn</h3>
            <p className="muted" style={{ margin: 0, fontSize: '0.85rem' }}>
              Aditya Novaldy
            </p>
            <span
              style={{
                display: 'inline-block',
                marginTop: '1.2rem',
                color: 'var(--accent-bright)',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Profil &rarr;
            </span>
          </a>
        </div>
        <div className="col-lg-3 col-md-6 col-6">
          <a
            href="https://github.com/adafi13"
            target="_blank"
            rel="noopener"
            className="card reveal"
            style={{ textAlign: 'center', display: 'block', textDecoration: 'none', height: '100%' }}
          >
            <i className="fa-brands fa-github" style={{ color: '#ffffff', marginBottom: '1rem' }}></i>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text)' }}>GitHub</h3>
            <p className="muted" style={{ margin: 0, fontSize: '0.85rem' }}>
              @adafi13
            </p>
            <span
              style={{
                display: 'inline-block',
                marginTop: '1.2rem',
                color: 'var(--accent-bright)',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Kode &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
