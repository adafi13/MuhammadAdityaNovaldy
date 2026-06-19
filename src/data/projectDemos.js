import vlanTopology from '../assets/img/vlan-topology.png';
import ospfRouting from '../assets/img/ospf-routing.png';
import internetNat from '../assets/img/internet-nat.png';

export const projectDemos = {
  vlan: {
    image: vlanTopology,
    alt: 'VLAN Topology',
    description:
      'Proyek ini mencakup segmentasi jaringan fisik menjadi beberapa segmen logis (VLAN) untuk Dosen, Mahasiswa, dan Admin. Tujuannya adalah untuk meningkatkan keamanan, membatasi domain broadcast, dan mempermudah manajemen.',
    codeTitle: 'Konfigurasi Inti (Cisco IOS)',
    code: `! Konfigurasi Router-on-a-stick
interface GigabitEthernet0/0.10
 encapsulation dot1Q 10
 ip address 192.168.10.1 255.255.255.0
!
interface GigabitEthernet0/0.20
 encapsulation dot1Q 20
 ip address 192.168.20.1 255.255.255.0`,
  },
  ospf: {
    image: ospfRouting,
    alt: 'OSPF Topology',
    description:
      'Simulasi topologi redundan dengan tiga router menggunakan protokol OSPF (Area 0). Konfigurasi ini menjamin jika salah satu jalur terputus, lalu lintas data akan otomatis dialihkan melalui jalur alternatif dalam hitungan detik.',
    codeTitle: 'Konfigurasi Inti (Cisco IOS)',
    code: `! Konfigurasi Routing OSPF Single Area
router ospf 1
 router-id 1.1.1.1
 network 10.0.0.0 0.0.0.3 area 0
 network 10.0.0.4 0.0.0.3 area 0
 network 192.168.1.0 0.0.0.255 area 0
 passive-interface GigabitEthernet0/1`,
  },
  nat: {
    image: internetNat,
    alt: 'NAT Topology',
    description:
      'Implementasi Gateway Internet menggunakan Router. Proyek ini mempraktikkan konversi IP lokal (Private IP) menjadi IP Publik menggunakan teknik NAT (Network Address Translation) serta menerapkan Firewall dasar untuk keamanan.',
    codeTitle: 'Konfigurasi Inti (MikroTik RouterOS)',
    code: `# Mengaktifkan NAT (Masquerade)
/ip firewall nat
add action=masquerade chain=srcnat out-interface=ether1

# Firewall Basic Security (Drop Invalid)
/ip firewall filter
add action=accept chain=forward connection-state=established,related
add action=drop chain=forward connection-state=invalid`,
  },
};
