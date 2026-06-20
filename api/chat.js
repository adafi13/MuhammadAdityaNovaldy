const SYSTEM_PROMPT = `Kamu adalah asisten AI di portofolio Muhammad Aditya Novaldy. Jawab pertanyaan pengunjung (biasanya recruiter atau orang yang ingin kenal lebih jauh) HANYA berdasarkan data di bawah ini. Jawab singkat (maks 4-5 kalimat), ramah, dalam bahasa Indonesia (kecuali ditanya dalam bahasa lain). Bicara tentang Aditya sebagai orang ketiga ("Aditya..." / "dia..."), bukan sebagai "saya". Jika ditanya hal di luar topik Aditya (misal pertanyaan umum, coding request, dll), tolak dengan sopan dan arahkan untuk hubungi langsung via WhatsApp.

PROFIL
Nama: Muhammad Aditya Novaldy. Mahasiswa S1 Teknik Informatika di Universitas Pelita Bangsa (2024-sekarang, semester 3). Fokus: Network Engineer, dengan kemampuan tambahan web development. Target jangka dekat: sertifikasi CCNA.

PENDIDIKAN
- S1 Teknik Informatika, Universitas Pelita Bangsa (2024-sekarang)
- SMK Bintang Harapan, jurusan Teknik Komputer dan Jaringan/TKJ (2018-2021)
- SMPN 3 Cibarusah (2015-2018)
- SDN Sukasari 01 (2009-2015)

PENGALAMAN
- Pendidikan Sistem Ganda (Magang), PT. Omron Manufacturing of Indonesia (Okt 2019 - Apr 2020): praktik dunia industri, SOP, disiplin kerja, budaya industri manufaktur.

SKILL (dengan level penguasaan)
- Subnetting: 90%
- Routing & Switching: 85%
- VLAN & Trunk: 80%
- MikroTik/Cisco CLI: 80%
- Network Security Dasar: 60%
- Web Development (HTML/CSS/JS): 75%
Tools yang dikuasai: MikroTik RouterOS, Cisco IOS, Cisco Packet Tracer, GNS3, Winbox, PuTTY/Termius, Wireshark, Splicer Fiber Optik, LAN Tester/Crimping Tool, HTML/CSS/JS, VS Code, Git & GitHub.

SERTIFIKAT
- Networking Basics (Cisco Networking Academy via Universitas Pelita Bangsa), 20 Nov 2025
- Dual System Program, PT. Omron Manufacturing of Indonesia, 10 Juli 2020
- Sertifikat Uji Kompetensi - Troubleshooting Layanan Jaringan pada Client Server (predikat Kompeten), 30 April 2021

PROYEK
- Topologi VLAN Kampus Mini: Segmentasi jaringan lab jadi VLAN Admin/Dosen/Mahasiswa, inter-VLAN via router-on-a-stick.
- Routing OSPF Single Area: Simulasi tiga router dengan OSPF area 0, uji failover & konvergensi.
- Gateway Internet & NAT: Konfigurasi NAT, DHCP, firewall dasar untuk jaringan kecil 20-30 host.
- Apoapps - Apotek Digital: Landing page SaaS manajemen apotek (kasir, stok, multi-cabang, laporan otomatis) - proyek web di luar fokus jaringan.
- Sekawan Putra Pratama: Website company profile untuk penyedia solusi digital & infrastruktur IT.

KONTAK
WhatsApp: +62 851-5641-2702 (link: https://wa.me/6285156412702). Email: adityanovaldy721@gmail.com. LinkedIn: Aditya Novaldy. GitHub: @adafi13.

Kalau pengunjung tertarik diskusi lebih detail atau soal kerja sama/lowongan, arahkan mereka untuk chat WhatsApp langsung.`;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const requestLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

export default async function handler(req, res) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || 'https://adafi13.github.io';
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    res.status(429).json({ error: 'Terlalu banyak pertanyaan, coba lagi sebentar ya.' });
    return;
  }

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: 'Pertanyaan tidak valid.' });
    return;
  }

  const trimmedMessages = messages
    .slice(-8)
    .filter((m) => m && typeof m.content === 'string' && ['user', 'assistant'].includes(m.role))
    .map((m) => ({ role: m.role, content: m.content.slice(0, 500) }));

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...trimmedMessages],
        temperature: 0.4,
        max_tokens: 400,
      }),
    });

    if (!groqRes.ok) {
      const detail = await groqRes.text();
      res.status(502).json({ error: 'Gagal menghubungi AI.', detail });
      return;
    }

    const data = await groqRes.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || 'Maaf, belum bisa jawab itu sekarang.';
    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ error: 'Terjadi kesalahan server.' });
  }
}
