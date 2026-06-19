import { certificates } from '../data/certificates';

export default function Certificates() {
  return (
    <section id="certificates" className="section container">
      <p className="section-label reveal">Prestasi</p>
      <h2 className="section-title reveal">
        <i className="fa-solid fa-award"></i> Sertifikat & Prestasi
        <svg className="title-deco" viewBox="0 0 60 12" fill="none">
          <path d="M2 6 Q15 0 28 6 T58 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </h2>
      <div className="row g-4" style={{ marginTop: '.4rem' }}>
        {certificates.map((cert) => (
          <div className="col-lg-4" key={cert.title}>
            <div className="card reveal" style={{ padding: '1.2rem' }}>
              <div style={{ borderRadius: 12, overflow: 'hidden', marginBottom: '1.2rem', border: '1px solid var(--accent-border)' }}>
                <img
                  src={cert.image}
                  alt={cert.alt}
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', aspectRatio: '4/3' }}
                />
              </div>
              <p
                className="meta"
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--accent-bright)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  letterSpacing: '0.08em',
                }}
              >
                {cert.date}
              </p>
              <h4 style={{ marginBottom: '0.5rem' }}>{cert.title}</h4>
              <p className="muted" style={{ margin: 0 }}>
                {cert.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
