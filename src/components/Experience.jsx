export default function Experience() {
  return (
    <section id="experience" className="section container">
      <p className="section-label reveal">Jejak Langkah</p>
      <h2 className="section-title reveal">
        <i className="fa-solid fa-graduation-cap"></i> Pendidikan & Pengalaman
        <svg className="title-deco" viewBox="0 0 60 12" fill="none">
          <path d="M2 6 Q15 0 28 6 T58 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </h2>
      <div className="row g-4" style={{ marginTop: '.4rem' }}>
        <div className="col-lg-6">
          <div className="exp-card reveal" style={{ height: '100%' }}>
            <p className="meta">2024 — Sekarang</p>
            <h4>S1 Teknik Informatika</h4>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
              <strong>Universitas Pelita Bangsa</strong>
              <br />
              Mahasiswa aktif semester 3. Mendalami dasar-dasar ilmu komputer, jaringan (subnetting,
              routing/switching), dan pengembangan teknologi informasi terkini.
            </p>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="exp-card reveal" style={{ height: '100%' }}>
            <p className="meta">Okt 2019 — Apr 2020</p>
            <h4>Pendidikan Sistem Ganda (Magang)</h4>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
              <strong>PT. Omron Manufacturing of Indonesia</strong>
              <br />
              Melaksanakan program praktik dunia industri, mempelajari standar operasional prosedur,
              disiplin kerja tingkat tinggi, dan budaya industri manufaktur.
            </p>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="exp-card reveal">
            <h4 style={{ marginBottom: '1.2rem', fontSize: '1.1rem' }}>
              <i
                className="fa-solid fa-clock-rotate-left"
                style={{ color: 'var(--accent-bright)', marginRight: '0.5rem' }}
              ></i>{' '}
              Riwayat Pendidikan Menengah & Dasar
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
              <div style={{ flex: 1, minWidth: 220, borderLeft: '3px solid var(--accent-bright)', paddingLeft: '1rem' }}>
                <strong style={{ color: 'white', fontSize: '1.05rem' }}>SMK Bintang Harapan</strong>
                <br />
                <span style={{ color: 'var(--accent-bright)', fontSize: '0.85rem', fontWeight: 600 }}>2018 — 2021</span>
                <br />
                Jurusan Teknik Komputer dan Jaringan (TKJ).
              </div>
              <div style={{ flex: 1, minWidth: 220, borderLeft: '3px solid var(--accent)', paddingLeft: '1rem' }}>
                <strong style={{ color: 'white', fontSize: '1.05rem' }}>SMPN 3 Cibarusah</strong>
                <br />
                <span style={{ color: 'var(--accent-bright)', fontSize: '0.85rem', fontWeight: 600 }}>2015 — 2018</span>
              </div>
              <div style={{ flex: 1, minWidth: 220, borderLeft: '3px solid var(--accent-2)', paddingLeft: '1rem' }}>
                <strong style={{ color: 'white', fontSize: '1.05rem' }}>SDN Sukasari 01</strong>
                <br />
                <span style={{ color: 'var(--accent-bright)', fontSize: '0.85rem', fontWeight: 600 }}>2009 — 2015</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
