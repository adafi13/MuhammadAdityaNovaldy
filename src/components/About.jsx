export default function About() {
  return (
    <section id="about" className="section container">
      <p className="section-label reveal">Tentang</p>
      <h2 className="section-title reveal">
        <i className="fa-solid fa-user"></i> Profil Singkat
        <svg className="title-deco" viewBox="0 0 60 12" fill="none">
          <path d="M2 6 Q15 0 28 6 T58 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </h2>
      <p className="reveal" style={{ maxWidth: '70ch' }}>
        Saya Mahasiswa Universitas Pelita Bangsa Semester 3 dan Saya juga punya Skill yang berfokus pada
        administrasi dan desain jaringan kecil-menengah. Familiar dengan pengalamatan IP, konfigurasi
        perangkat, pengujian konektivitas, dan dokumentasi standar. Tertarik mengejar sertifikasi <em>CCNA</em>{' '}
        sebagai target jangka dekat.
      </p>
      <p className="reveal muted" style={{ maxWidth: '70ch' }}>
        Buat saya, jaringan itu seperti teka-teki yang harus selalu nyambung — satu kabel salah pasang atau
        satu VLAN salah konfigurasi bisa bikin semuanya berhenti. Bagian yang paling saya suka justru momen
        ketika topologi yang tadinya berantakan akhirnya "klik" dan semua perangkat bisa saling bicara
        dengan benar.
      </p>
      <div className="row g-4" style={{ marginTop: '.6rem' }}>
        <div className="col-lg-6">
          <div className="card reveal">
            <h3>Fokus Utama</h3>
            <ul className="list">
              <li>Perencanaan IP & Subnetting</li>
              <li>Routing statis & dinamis (RIPv2, OSPF single area)</li>
              <li>VLAN & Trunking, Inter-VLAN</li>
              <li>Firewall dasar & NAT</li>
              <li>Monitoring ringan (ping, traceroute, Netwatch)</li>
            </ul>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card reveal">
            <h3>Perangkat & Tools</h3>
            <ul className="badges">
              <li>MikroTik RouterOS</li>
              <li>Cisco IOS</li>
              <li>Cisco Packet Tracer</li>
              <li>GNS3</li>
              <li>Winbox</li>
              <li>PuTTY / Termius</li>
              <li>Wireshark</li>
              <li>Splicer Fiber Optik</li>
              <li>LAN Tester / Crimping Tool</li>
              <li>HTML / CSS / JS</li>
              <li>VS Code</li>
              <li>Git & GitHub</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
