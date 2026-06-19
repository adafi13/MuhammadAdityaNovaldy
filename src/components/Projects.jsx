import { projects } from '../data/projects';
import { projectDemos } from '../data/projectDemos';

function DemoModalBody({ demoKey }) {
  const demo = projectDemos[demoKey];
  if (!demo) return <p>Ringkasan belum tersedia.</p>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <img
        src={demo.image}
        alt={demo.alt}
        style={{ width: '100%', borderRadius: 8, border: '1px solid var(--accent-border)' }}
      />
      <p style={{ margin: 0, lineHeight: 1.6 }}>{demo.description}</p>
      <h4 style={{ marginTop: '0.5rem', color: 'var(--accent-bright)' }}>{demo.codeTitle}</h4>
      <pre
        style={{
          background: 'rgba(0,0,0,0.5)',
          padding: '1.2rem',
          borderRadius: 8,
          border: '1px solid var(--accent-border)',
          overflowX: 'auto',
          fontSize: '0.85rem',
        }}
      >
        <code style={{ color: '#a5d6ff', fontFamily: 'monospace' }}>{demo.code}</code>
      </pre>
    </div>
  );
}

export default function Projects({ onOpenModal }) {
  return (
    <section id="projects" className="section container">
      <p className="section-label reveal">Portofolio</p>
      <h2 className="section-title reveal">
        <i className="fa-solid fa-diagram-project"></i> Lab / Proyek Sederhana
        <svg className="title-deco" viewBox="0 0 60 12" fill="none">
          <path d="M2 6 Q15 0 28 6 T58 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </h2>
      <div className="row g-4" style={{ marginTop: '.4rem' }}>
        {projects.map((project) => (
          <div className="col-lg-6" key={project.title}>
            <article className="project card reveal">
              <div className="project__thumb is-photo">
                <img src={project.image} alt={project.alt} loading="lazy" />
              </div>
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              {project.demo ? (
                <button
                  className="btn btn--small"
                  onClick={() => onOpenModal(project.title, <DemoModalBody demoKey={project.demo} />)}
                >
                  Lihat Ringkasan <i className="fa-solid fa-arrow-right"></i>
                </button>
              ) : (
                <a className="btn btn--small" href={project.link} target="_blank" rel="noopener">
                  Kunjungi Website <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              )}
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
