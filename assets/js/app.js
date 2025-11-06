const root = document.documentElement;
const saved = localStorage.getItem('themeSimple');
if(saved==='light') root.classList.add('light');
document.getElementById('themeToggle')?.addEventListener('click', ()=>{
  root.classList.toggle('light');
  localStorage.setItem('themeSimple', root.classList.contains('light') ? 'light' : 'dark');
});

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle?.addEventListener('click', ()=> navMenu.classList.toggle('show'));
navMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=> navMenu.classList.remove('show')));

document.getElementById('year').textContent = new Date().getFullYear();

const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.querySelector('i').style.width = (e.target.dataset.val||70) + '%';
      obs.unobserve(e.target);
    }
  });
},{threshold:.6});
document.querySelectorAll('.skill .bar').forEach(b => obs.observe(b));

document.querySelectorAll('.skill').forEach(s => {
  s.addEventListener('click', ()=> alert('Catatan: ' + s.querySelector('span').textContent + ' — praktik rutin & dokumentasi konfigurasi.'));
});


const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const titleEl = document.getElementById('modalTitle');
const bodyEl = document.getElementById('modalBody');
closeModal?.addEventListener('click', ()=> modal.close());

document.querySelectorAll('[data-demo]').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.demo;
    titleEl.textContent = btn.closest('.project').querySelector('h3').textContent;
    bodyEl.innerHTML = render(type);
    modal.showModal();
  });
});

function render(type){
  if(type==='vlan'){
    return `<ul>
      <li>Buat VLAN 10/20/30, assign port akses.</li>
      <li>Konfig trunk 802.1Q antar switch.</li>
      <li>Router-on-a-stick: subinterface g0/0.10, .20, .30 + encapsulation dot1Q.</li>
      <li>DHCP per VLAN, uji ping antar VLAN.</li>
      <li>Dokumentasi: tabel port & IP plan.</li>
    </ul>`;
  }
  if(type==='ospf'){
    return `<ul>
      <li>IP plan tiap link /30, loopback /32.</li>
      <li>OSPF area 0, network statement spesifik.</li>
      <li>Set router-id dari loopback, passive interface pada LAN.</li>
      <li>Uji down/up salah satu link, cek konvergensi.</li>
    </ul>`;
  }
  if(type==='nat'){
    return `<ul>
      <li>LAN private (mis. 192.168.10.0/24), WAN publik simulasi.</li>
      <li>DHCP server untuk host, DNS ke 8.8.8.8.</li>
      <li>Source NAT/MASQUERADE, firewall dasar (allow established/related).</li>
      <li>Optional port forwarding untuk layanan internal.</li>
    </ul>`;
  }
  return '<p>Ringkasan belum tersedia.</p>';
}

document.getElementById('contactForm')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const f = new FormData(e.target);
  const subject = encodeURIComponent('NetPort — ' + f.get('name'));
  const body = encodeURIComponent('Nama: ' + f.get('name') + '%0AEmail: ' + f.get('email') + '%0A%0A' + f.get('message'));
  window.location.href = `mailto:halo@example.com?subject=${subject}&body=${body}`;
});

(function(){
  const el = document.getElementById("typewriter");
  if(!el) return;

  const skills = [
    "MikroTik & Cisco",
    "VLAN & Trunking",
    "Routing OSPF / RIPv2",
    "Subnetting IPv4",
    "Firewall & NAT"
  ];

  let i = 0, j = 0, deleting = false;
  const typeSpeed = 70, eraseSpeed = 45, holdAfterType = 900, holdAfterErase = 300;

  function loop(){
    const word = skills[i % skills.length];
    if(!deleting){
      el.textContent = word.slice(0, j++);
      if(j <= word.length) return setTimeout(loop, typeSpeed);
      deleting = true; return setTimeout(loop, holdAfterType);
    }else{
      el.textContent = word.slice(0, j--);
      if(j >= 0) return setTimeout(loop, eraseSpeed);
      deleting = false; i++; j = 0; return setTimeout(loop, holdAfterErase);
    }
  }
  loop();
})();

(() => {
  const card = document.querySelector('.profile-card');
  if(!card) return;
  card.addEventListener('pointermove', (e) => {
    const b = card.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width * 2 - 1;  // -1..1
    const y = (e.clientY - b.top)  / b.height* 2 - 1;
    card.style.transform = `rotateX(${-y*6}deg) rotateY(${x*6}deg) translateY(-4px)`;
  });
  card.addEventListener('pointerleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0)';    // reset
  });
})();

