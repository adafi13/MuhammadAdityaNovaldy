import { prefersReducedMotion } from '../utils/prefersReducedMotion';

const WA_LINK =
  'https://wa.me/6285156412702?text=Halo,%20saya%20Muhammad%20Aditya%20Novaldy.%20Saya%20ingin%20menghubungi%20melalui%20portofolio.';

export default function FabGroup() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  return (
    <div className="fab-group">
      <a className="fab" href={WA_LINK} target="_blank" rel="noopener" aria-label="Chat WhatsApp">
        <i className="fa-brands fa-whatsapp"></i>
      </a>
      <button className="fab" aria-label="Kembali ke atas" onClick={scrollToTop}>
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </div>
  );
}
