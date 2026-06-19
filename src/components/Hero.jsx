import { useEffect, useState } from 'react';
import HeroCanvas from './HeroCanvas';
import heroPhoto from '../assets/img/foto-saya-cropped.png';
import cvPdf from '../assets/docs/cv-aditya-novaldy.pdf';
import { supportsWebGL } from '../utils/supportsWebGL';
import { prefersReducedMotion } from '../utils/prefersReducedMotion';

function typeInto(text, speed, setText, signal) {
  return new Promise((resolve) => {
    let i = 0;
    setText('');
    const interval = setInterval(() => {
      if (signal.aborted) {
        clearInterval(interval);
        return resolve();
      }
      if (i < text.length) {
        i++;
        setText(text.slice(0, i));
      } else {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

function wait(ms, signal) {
  return new Promise((resolve) => {
    const timeout = setTimeout(resolve, ms);
    signal.addEventListener('abort', () => clearTimeout(timeout));
  });
}

export default function Hero() {
  const [labelText, setLabelText] = useState('');
  const [nameText, setNameText] = useState('');
  const [roleText, setRoleText] = useState('');
  const [descText, setDescText] = useState('');
  const [labelCursor, setLabelCursor] = useState(false);
  const [nameCursor, setNameCursor] = useState(false);
  const [roleCursor, setRoleCursor] = useState(false);
  const [descCursor, setDescCursor] = useState(false);
  const [canUse3D] = useState(() => supportsWebGL() && !prefersReducedMotion());

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function run() {
      await wait(500, signal);
      if (signal.aborted) return;

      setLabelCursor(true);
      await typeInto('Halo, saya', 40, setLabelText, signal);
      setLabelCursor(false);
      await wait(100, signal);
      if (signal.aborted) return;

      setNameCursor(true);
      await typeInto('Muhammad Aditya Novaldy', 40, setNameText, signal);
      setNameCursor(false);
      await wait(100, signal);
      if (signal.aborted) return;

      setRoleCursor(true);
      await typeInto('Network Engineer', 60, setRoleText, signal);
      await wait(100, signal);
      if (signal.aborted) return;

      await typeInto(
        'Kuat di dasar jaringan komputer: subnetting, routing/switching, VLAN, dan konfigurasi Cisco/MikroTik. Suka membuat topologi efisien dan terdokumentasi.',
        15,
        setDescText,
        signal
      );
      if (signal.aborted) return;
      setRoleCursor(false);
      setDescCursor(true);
    }

    run();
    return () => controller.abort();
  }, []);

  return (
    <section id="home" className="hero">
      {canUse3D ? <HeroCanvas /> : <div className="hero__fallback-bg" aria-hidden="true" />}
      <div className="container hero__inner">
        <div className="hero__text glass-panel">
          <p className={`section-label${labelCursor ? ' cursor-blink' : ''}`}>{labelText}</p>
          <h1>
            <span className={nameCursor ? 'cursor-blink' : ''}>{nameText}</span>{' '}
            <span className={`typing-role${roleCursor ? ' cursor-blink' : ''}`}>{roleText}</span>
          </h1>
          <p className={descCursor ? 'cursor-blink' : ''} style={{ minHeight: 80 }}>
            {descText}
          </p>
          <div className="cta" style={{ marginTop: '1.5rem' }}>
            <a className="btn" href="#projects">
              Lihat Proyek <i className="fa-solid fa-arrow-right"></i>
            </a>
            <a
              className="btn btn--ghost"
              href={cvPdf}
              download="CV_Muhammad_Aditya_Novaldy.pdf"
              target="_blank"
              rel="noopener"
              style={{ borderColor: 'var(--accent-bright)', color: 'var(--accent-bright)' }}
            >
              Unduh CV <i className="fa-solid fa-file-pdf" style={{ marginLeft: '0.3rem' }}></i>
            </a>
          </div>
        </div>
        <div className="hero__photo">
          <div className="photo-frame">
            <img src={heroPhoto} alt="Muhammad Aditya Novaldy" />
          </div>
        </div>
      </div>
    </section>
  );
}
