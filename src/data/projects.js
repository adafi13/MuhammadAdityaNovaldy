import vlanTopology from '../assets/img/vlan-topology.jpg';
import ospfRouting from '../assets/img/ospf-routing.jpg';
import internetNat from '../assets/img/internet-nat.jpg';
import apoapps from '../assets/img/projects/apoapps.jpg';
import spp from '../assets/img/projects/spp.jpg';

export const projects = [
  {
    image: vlanTopology,
    alt: 'Topologi VLAN Kampus Mini',
    title: 'Topologi VLAN Kampus Mini',
    desc: 'Segmentasi jaringan lab menjadi VLAN Admin, Dosen, dan Mahasiswa. Inter-VLAN via router-on-a-stick.',
    demo: 'vlan',
  },
  {
    image: ospfRouting,
    alt: 'Routing OSPF Single Area',
    title: 'Routing OSPF Single Area',
    desc: 'Simulasi tiga router dengan OSPF area 0. Uji failover dan konvergensi dasar.',
    demo: 'ospf',
  },
  {
    image: internetNat,
    alt: 'Gateway Internet & NAT',
    title: 'Gateway Internet & NAT',
    desc: 'Konfigurasi NAT, DHCP, dan firewall dasar untuk jaringan kecil 20–30 host.',
    demo: 'nat',
  },
  {
    image: apoapps,
    alt: 'Tampilan landing page Apoapps - Apotek Digital',
    title: 'Apoapps — Apotek Digital',
    desc: 'Landing page untuk platform SaaS manajemen apotek (kasir, stok, multi-cabang, laporan otomatis). Proyek pengembangan web di luar fokus jaringan.',
    link: 'https://apoapps.sekawanputrapratama.com/',
  },
  {
    image: spp,
    alt: 'Tampilan website Sekawan Putra Pratama',
    title: 'Sekawan Putra Pratama',
    desc: 'Pembuatan website Company Profile untuk penyedia layanan solusi digital, pembuatan aplikasi, website, dan infrastruktur IT.',
    link: 'https://sekawanputrapratama.com/',
  },
];
