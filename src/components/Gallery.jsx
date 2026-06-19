import { useEffect, useRef } from 'react';
import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.js';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { galleryItems } from '../data/gallery';

export default function Gallery() {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    Fancybox.bind(grid, '[data-fancybox="gallery"]', {});
    return () => Fancybox.unbind(grid);
  }, []);

  return (
    <section id="gallery" className="section container">
      <p className="section-label reveal">Galeri</p>
      <h2 className="section-title reveal">
        <i className="fa-solid fa-images"></i> Galeri Kegiatan
        <svg className="title-deco" viewBox="0 0 60 12" fill="none">
          <path d="M2 6 Q15 0 28 6 T58 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </h2>
      <div className="gallery-grid reveal" style={{ marginTop: '.6rem' }} ref={gridRef}>
        {galleryItems.map((item) => (
          <a
            className="gallery-item"
            href={item.image}
            key={item.caption}
            data-fancybox="gallery"
            data-caption={item.alt}
          >
            <img src={item.image} alt={item.alt} loading="lazy" />
            <span className="cap">{item.caption}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
