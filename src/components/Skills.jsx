import { skills } from '../data/skills';

function SkillBar({ skill, onOpenModal }) {
  return (
    <div
      className="skill reveal"
      data-val={skill.value}
      onClick={() =>
        onOpenModal(
          skill.label,
          <p style={{ margin: 0, lineHeight: 1.6 }}>Praktik rutin & dokumentasi konfigurasi.</p>
        )
      }
    >
      <div className="skill__head">
        <span className="label">{skill.label}</span>
        <span className="pct"></span>
      </div>
      <div className="progress">
        <div className="progress-bar"></div>
      </div>
    </div>
  );
}

export default function Skills({ onOpenModal }) {
  return (
    <section id="skills" className="section container">
      <p className="section-label reveal">Keahlian</p>
      <h2 className="section-title reveal">
        <i className="fa-solid fa-chart-line"></i> Keahlian Inti
        <svg className="title-deco" viewBox="0 0 60 12" fill="none">
          <path d="M2 6 Q15 0 28 6 T58 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </h2>
      <p
        className="typewrap reveal"
        aria-label="Keahlian unggulan"
        style={{
          fontSize: '1.1rem',
          color: 'var(--accent-bright)',
          fontWeight: 500,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        <span>Infrastruktur Jaringan & Web Development</span>
      </p>

      <div className="row g-4" style={{ marginTop: '.6rem' }}>
        <div className="col-lg-6">
          {skills.slice(0, 3).map((skill) => (
            <SkillBar key={skill.label} skill={skill} onOpenModal={onOpenModal} />
          ))}
        </div>
        <div className="col-lg-6">
          {skills.slice(3).map((skill) => (
            <SkillBar key={skill.label} skill={skill} onOpenModal={onOpenModal} />
          ))}
        </div>
      </div>
      <p className="muted">Klik salah satu baris untuk melihat catatan ringkas.</p>
    </section>
  );
}
