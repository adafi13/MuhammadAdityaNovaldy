import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Tools from './components/Tools';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import Projects from './components/Projects';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FabGroup from './components/FabGroup';
import Modal from './components/Modal';
import { prefersReducedMotion } from './utils/prefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

function fillSkill(skill) {
  const val = skill.dataset.val || 70;
  skill.querySelector('.progress-bar').style.width = val + '%';
  skill.querySelector('.pct').textContent = val + '%';
}

export default function App() {
  const [modal, setModal] = useState({ open: false, title: '', content: null, size: null });

  const openModal = (title, content, size) => setModal({ open: true, title, content, size });
  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const skillEls = document.querySelectorAll('.skill');
    const tweens = [];

    if (prefersReducedMotion()) {
      reveals.forEach((el) => {
        el.style.opacity = 1;
        el.style.transform = 'none';
      });
      skillEls.forEach(fillSkill);
    } else {
      reveals.forEach((el) => {
        tweens.push(
          gsap.fromTo(
            el,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%' } }
          )
        );
      });
      skillEls.forEach((skill) => {
        ScrollTrigger.create({
          trigger: skill,
          start: 'top 90%',
          once: true,
          onEnter: () => fillSkill(skill),
        });
      });
    }

    return () => {
      tweens.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <Header onOpenModal={openModal} />
      <main>
        <Hero onOpenModal={openModal} />
        <About />
        <Skills onOpenModal={openModal} />
        <Tools />
        <Experience />
        <Certificates />
        <Projects onOpenModal={openModal} />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <FabGroup />
      <Modal open={modal.open} title={modal.title} onClose={closeModal} size={modal.size}>
        {modal.content}
      </Modal>
    </>
  );
}
