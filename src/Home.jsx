import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardFooter, Image, Button } from "@heroui/react";
import ingeniaPrintImg from "./assets/IngeniaPrint.png";
import ScouterImg from "./assets/Scouter.png";
import FloatingLines from "./FloatingLines";
import { translations, LANGS } from "./Idiomas";
import "./Home.css";

const GITHUB_USER = import.meta.env.VITE_GITHUB_USER || "Nico0105";

const REPOS_CONFIG = [
  { name: "Ingenia-Print-Campus", customImage: ingeniaPrintImg },
  { name: "GestorEntrenamientos", customImage: null },
  { name: "Scouter", customImage: ScouterImg },
];

const SKILLS = [
  {
    name: "JavaScript", color: "#F7DF1E",
    svg: (<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="3" fill="#F7DF1E"/><path d="M9 24.3l2.1-1.3c.4.7.8 1.3 1.6 1.3.8 0 1.3-.3 1.3-1.6V14h2.6v8.8c0 2.6-1.5 3.8-3.8 3.8-2 0-3.2-1-3.8-2.3zM18.5 24l2.1-1.3c.6.9 1.3 1.6 2.6 1.6 1.1 0 1.7-.5 1.7-1.2 0-.9-.7-1.2-1.8-1.7l-.6-.3c-1.9-.8-3.1-1.8-3.1-3.9 0-1.9 1.5-3.3 3.7-3.3 1.6 0 2.8.6 3.6 2l-2 1.3c-.4-.8-.9-1.1-1.6-1.1-.8 0-1.2.5-1.2 1.1 0 .7.5 1 1.5 1.5l.6.3c2.2.9 3.4 1.9 3.4 4 0 2.3-1.8 3.5-4.2 3.5-2.3 0-3.8-1.1-4.7-2.5z" fill="#000"/></svg>),
  },
  {
    name: "TypeScript", color: "#3178C6",
    svg: (<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="3" fill="#3178C6"/><path d="M18.2 17.4H20.4V15.8H13.5v1.6h2.2V25h2.5V17.4zM21.8 22.5c0 1.4 1.1 2.7 3.2 2.7 2 0 3.3-1 3.3-2.8 0-1.4-.9-2.2-2.4-2.8l-.7-.3c-.8-.3-1.1-.6-1.1-1.1 0-.5.4-.8 1-.8.7 0 1 .4 1.3 1l1.7-1c-.5-1.1-1.5-1.8-3-1.8-1.9 0-3.1 1.1-3.1 2.7 0 1.3.9 2.1 2.2 2.7l.7.3c.9.4 1.4.7 1.4 1.2 0 .6-.5.9-1.2.9-.9 0-1.4-.6-1.8-1.3l-1.8 1z" fill="#fff"/></svg>),
  },
  {
    name: "Node.js", color: "#5FA04E",
    svg: (<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 3L4 9.8v12.4L16 29l12-6.8V9.8L16 3z" fill="#5FA04E"/><path d="M16 7.5l-7.5 4.3v8.4L16 24.5l7.5-4.3v-8.4L16 7.5z" fill="#3E7A34"/><circle cx="16" cy="16" r="3.5" fill="#fff"/><path d="M16 12.5v7M12.5 16h7" stroke="#5FA04E" strokeWidth="1.5" strokeLinecap="round"/></svg>),
  },
  {
    name: "Python", color: "#3776AB",
    svg: (<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.9 3C10.5 3 10.8 5.4 10.8 5.4v2.7h5.3v.9H8.5S5 8.6 5 14c0 5.5 3 5.3 3 5.3h1.9v-2.6s-.1-3 3-3h5.2s2.9.1 2.9-2.8V6S21.5 3 15.9 3zm-3 1.7c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z" fill="#3776AB"/><path d="M16.1 29c5.4 0 5.1-2.4 5.1-2.4v-2.7h-5.3v-.9h7.6S27 22.4 27 17c0-5.5-3-5.3-3-5.3h-1.9v2.6s.1 3-3 3h-5.2s-2.9-.1-2.9 2.8V25S10.5 29 16.1 29zm3-1.7c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" fill="#FFD43B"/></svg>),
  },
  {
    name: "Express", color: "#ffffff",
    svg: (<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="3" fill="#1a1a1a"/><text x="4" y="21" fontFamily="monospace" fontSize="11" fill="#fff" fontWeight="bold">exp</text></svg>),
  },
  {
    name: "Java", color: "#ED8B00",
    svg: (<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.3 21.2s-1 .6.7.8c2 .2 3 .2 5.2-.2 0 0 .6.4 1.4.7-4.9 2.1-11.1-.1-7.3-1.3" fill="#0074BD"/><path d="M11.7 18.4s-1.1.8.6 1c2.1.2 3.8.2 6.7-.3 0 0 .4.4 1 .6-5.9 1.7-12.5.1-8.3-1.3" fill="#0074BD"/><path d="M17.2 12.5c1.2 1.4-.3 2.6-.3 2.6s3-1.6 1.6-3.6c-1.3-1.8-2.3-2.7 2.5-5.7 0 0-8.2 2.1-3.8 6.7" fill="#EA2D2E"/><path d="M23.3 22.8s.7.6-.8 1c-2.8.9-11.8 1.1-14.3 0-.9-.4.8-.9 1.3-1.1.5-.1.9-.1.9-.1-1-.7-6.4 1.4-2.7 2 9.9 1.6 18.1-.7 15.6-1.8" fill="#0074BD"/><path d="M13.1 14.6s-4.5 1.1-1.6 1.5c1.2.2 3.7.1 6-.1 1.9-.2 3.8-.5 3.8-.5s-.7.3-1.1.6c-4.6 1.2-13.5.7-10.9-.6 2.2-1 3.8-.9 3.8-.9" fill="#0074BD"/><path d="M21.2 19.4c4.7-2.5 2.5-4.8 1-4.5-.4.1-.5.1-.5.1s.1-.2.4-.3c3-1.1 5.3 3.1-1 4.8 0 0 .1-.1.1-.1" fill="#0074BD"/><path d="M15.6 3S18 5.4 13.3 9.1c-4 3.2-.9 5 0 7.1-2.4-2.1-4.1-4-3-5.7 1.7-2.6 6.4-3.8 5.3-7.5" fill="#EA2D2E"/></svg>),
  },
  {
    name: "SQL", color: "#336791",
    svg: (<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="16" cy="9" rx="11" ry="4.5" fill="#336791"/><path d="M5 9v5c0 2.5 4.9 4.5 11 4.5S27 16.5 27 14V9c0 2.5-4.9 4.5-11 4.5S5 11.5 5 9z" fill="#336791" opacity="0.8"/><path d="M5 14v5c0 2.5 4.9 4.5 11 4.5S27 21.5 27 19v-5c0 2.5-4.9 4.5-11 4.5S5 16.5 5 14z" fill="#336791" opacity="0.6"/><ellipse cx="16" cy="9" rx="11" ry="4.5" fill="none" stroke="#5ba4cf" strokeWidth="0.8"/><ellipse cx="16" cy="9" rx="8" ry="2.5" fill="#5ba4cf" opacity="0.25"/></svg>),
  },
  {
    name: "HTML", color: "#E34F26",
    svg: (<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 3l2.2 24L16 29l8.8-2L27 3H5z" fill="#E34F26"/><path d="M16 27V5h9l-1.9 19L16 27z" fill="#EF652A"/><path d="M16 13.5h-4.6l-.3-3.4H16V6.7H8l.8 9H16v-2.2zM16 22.8l-3.8-1-.3-2.8H9l.5 5.6L16 26.3v-3.5z" fill="#fff"/><path d="M16 13.5v2.2h4.3l-.4 4.9-3.9 1v3.5l6.2-1.7.8-9.9H16z" fill="#ebebeb"/></svg>),
  },
  {
    name: "CSS", color: "#1572B6",
    svg: (<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 3l2.2 24L16 29l8.8-2L27 3H5z" fill="#1572B6"/><path d="M16 27V5h9l-1.9 19L16 27z" fill="#33A9DC"/><path d="M16 13.5H8.5l.3 3.4H16v-3.4zM16 6.7H7.8l.3 3.4H16V6.7z" fill="#fff"/><path d="M16 22.8l-3.8-1-.3-2.9H9l.5 5.6L16 26.3v-3.5zM16 13.5v3.4h4l-.4 4.8-3.6 1v3.5l6.2-1.7.9-11H16z" fill="#ebebeb"/></svg>),
  },
  {
    name: "Tailwind", color: "#06B6D4",
    svg: (<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 7c-3.4 0-5.6 1.7-6.4 5.1 1.3-1.7 2.7-2.3 4.3-1.9 .93.23 1.6.93 2.35 1.7C17.6 13.3 19.1 15 22.5 15c3.4 0 5.6-1.7 6.4-5.1-1.3 1.7-2.7 2.3-4.3 1.9-.93-.23-1.6-.93-2.35-1.7C20.9 8.7 19.4 7 16 7zM9.5 15c-3.4 0-5.6 1.7-6.4 5.1 1.3-1.7 2.7-2.3 4.3-1.9.93.23 1.6.93 2.35 1.7C11.1 21.3 12.6 23 16 23c3.4 0 5.6-1.7 6.4-5.1-1.3 1.7-2.7 2.3-4.3 1.9-.93-.23-1.6-.93-2.35-1.7C14.4 16.7 12.9 15 9.5 15z" fill="#06B6D4"/></svg>),
  },
];

// ============================================================
// LANG SWITCHER
// ============================================================
function LangSwitcher({ lang, setLang }) {
  return (
    <div className="lang-switcher">
      {LANGS.map((l) => (
        <button
          key={l.code}
          className={`lang-btn ${lang === l.code ? "lang-btn--active" : ""}`}
          onClick={() => setLang(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

// ============================================================
// ZOOM TITULO
// ============================================================
function ZoomTitle({ text, start }) {
  return (
    <motion.h1
      className="home-title"
      initial={{ scale: 4, opacity: 0, filter: "blur(20px)" }}
      animate={start ? { scale: 1, opacity: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {text}
    </motion.h1>
  );
}

// ============================================================
// LOADING SCREEN
// ============================================================
function LoadingScreen({ onFinish, lang }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(true);
  const t = translations[lang];

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const increment = current < 70 ? Math.random() * 4 + 2 : Math.random() * 1.5 + 0.3;
      current = Math.min(current + increment, 100);
      setProgress(Math.floor(current));
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => setDone(true), 600);
        setTimeout(() => { setVisible(false); if (onFinish) onFinish(); }, 1400);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const neonColor = `hsl(${120 + progress * 1.2}, 100%, 55%)`;
  const glowStrength = `0 0 8px ${neonColor}, 0 0 20px ${neonColor}, 0 0 45px ${neonColor}60`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div key="loader" className="loader-wrapper" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: "easeInOut" }}>
          <div className="loader-grain" />
          <div className="loader-ambient" style={{ background: `radial-gradient(circle, ${neonColor}08 0%, transparent 70%)` }} />
          <motion.div className="loader-percentage" animate={{ opacity: done ? 0 : 1 }} transition={{ duration: 0.3 }} style={{ color: neonColor, textShadow: glowStrength }}>
            {progress}<span className="loader-percentage-symbol">%</span>
          </motion.div>
          <div className="loader-bar-container">
            <div className="loader-bar-labels" style={{ color: `${neonColor}80` }}>
              <span>{t.loadingText}</span>
              <span>{progress < 100 ? t.loadingInit : t.loadingDone}</span>
            </div>
            <div className="loader-bar-track">
              <div className="loader-bar-fill" style={{ width: `${progress}%`, background: neonColor, boxShadow: glowStrength }} />
              <div className="loader-bar-dot" style={{ left: `${progress}%`, boxShadow: `0 0 6px ${neonColor}, 0 0 18px ${neonColor}, 0 0 35px ${neonColor}` }} />
            </div>
          </div>
          <AnimatePresence>
            {done && (
              <motion.div className="loader-done" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} style={{ color: neonColor, textShadow: glowStrength }}>
                ✦
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// ABOUT
// ============================================================
function AboutSection({ lang }) {
  const t = translations[lang];
  const statValues = ["9/10", "≈3.8", "ARG 🇦🇷", "5to año"];

  return (
    <motion.section className="about-section" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, ease: "easeOut" }}>
      <div className="about-header">
        <span className="section-number-label">01</span>
        <h3 className="section-title">{t.aboutLabel}</h3>
      </div>
      <div className="about-layout">
        <div className="about-text-block">
          <p className="about-text" dangerouslySetInnerHTML={{ __html: t.aboutP1("Nicolás Escolar") }} />
          <p className="about-text" dangerouslySetInnerHTML={{ __html: t.aboutP2 }} />
          <p className="about-text">{t.aboutP3}</p>
          <div className="about-tags">
            {t.tags.map((tag) => (
              <span key={tag} className="about-tag">{tag}</span>
            ))}
          </div>
        </div>
        <div className="about-stats">
          {statValues.map((val, i) => (
            <motion.div key={i} className="about-stat-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i, duration: 0.5 }}>
              <span className="about-stat-value">{val}</span>
              <span className="about-stat-label">{t.statLabels[i]}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// ============================================================
// SKILLS
// ============================================================
function SkillsSection({ lang }) {
  const t = translations[lang];
  return (
    <motion.section className="skills-section" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6 }}>
      <div className="skills-header">
        <span className="section-number-label">02</span>
        <h3 className="section-title">{t.skillsLabel}</h3>
      </div>
      <div className="skills-grid">
        {SKILLS.map((skill, i) => (
          <motion.div key={skill.name} className="skill-card" style={{ "--skill-color": skill.color }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 * i, duration: 0.4 }} whileHover={{ scale: 1.06 }}>
            <div className="skill-glow" />
            <div className="skill-icon">{skill.svg}</div>
            <p className="skill-name">{skill.name}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ============================================================
// PROYECTOS
// ============================================================
function ProjectsSection({ lang }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const t = translations[lang];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const results = await Promise.all(
          REPOS_CONFIG.map(({ name }) =>
            fetch(`https://api.github.com/repos/${GITHUB_USER}/${name}`).then((r) => {
              if (!r.ok) throw new Error(`Error ${r.status} for ${name}`);
              return r.json();
            })
          )
        );
        const merged = results.map((repo) => {
          const config = REPOS_CONFIG.find((r) => r.name === repo.name);
          return { ...repo, customImage: config?.customImage ?? null };
        });
        setProjects(merged);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const getImage = (p) => p.customImage || `https://opengraph.githubassets.com/1/${GITHUB_USER}/${p.name}`;

  if (loading) return <section className="projects-section"><p className="projects-loading">{t.loadingText}...</p></section>;

  const featured = projects[0];
  const rest = projects.slice(1, 3);

  return (
    <motion.section className="projects-section" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, ease: "easeOut" }}>
      <div className="projects-header">
        <span className="section-number-label">03</span>
        <h3 className="section-title">{t.projectsLabel}</h3>
      </div>

      {featured && (
        <motion.div className="project-card-wrapper project-card-featured" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <a href={featured.html_url} target="_blank" rel="noopener noreferrer" className="project-card-link">
            <Card isFooterBlurred className="project-card">
              <Image removeWrapper alt={featured.name} className="project-card-img project-card-img-featured" src={getImage(featured)} />
              <CardFooter className="project-card-footer">
                <div className="project-footer-info">
                  <p className="project-footer-title">{featured.name.replace(/-/g, " ")}</p>
                  <p className="project-footer-desc">{featured.description ? featured.description.substring(0, 80) + "..." : t.noDesc}</p>
                </div>
                <Button radius="full" size="sm" color="primary">{t.githubBtn}</Button>
              </CardFooter>
            </Card>
          </a>
        </motion.div>
      )}

      <div className="projects-grid-bottom">
        {rest.map((project, i) => (
          <motion.div key={project.id} className="project-card-wrapper" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + 0.1 * i, duration: 0.5 }}>
            <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="project-card-link">
              <Card isFooterBlurred className="project-card">
                {project.customImage ? (
                  <Image removeWrapper alt={project.name} className="project-card-img" src={getImage(project)} />
                ) : (
                  <div className="project-card-placeholder">
                    <span className="project-card-placeholder-name">{project.name.replace(/-/g, " ")}</span>
                  </div>
                )}
                <CardFooter className="project-card-footer">
                  <div className="project-footer-info">
                    <p className="project-footer-title">{project.name.replace(/-/g, " ")}</p>
                    <p className="project-footer-desc">{project.description ? project.description.substring(0, 55) + "..." : t.noDesc}</p>
                  </div>
                  <Button radius="full" size="sm" color="primary">{t.githubBtn}</Button>
                </CardFooter>
              </Card>
            </a>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ============================================================
// HOME
// ============================================================
export default function Home() {
  const [loadingDone, setLoadingDone] = useState(false);
  const [lang, setLang] = useState("es");
  const t = translations[lang];

  return (
    <div className="home-wrapper">
      {!loadingDone && <LoadingScreen onFinish={() => setLoadingDone(true)} lang={lang} />}
      {loadingDone && (
        <>
          {/* Lang switcher — flota arriba a la derecha */}
          <LangSwitcher lang={lang} setLang={setLang} />

          <section className="home-hero">
            <FloatingLines
              enabledWaves={["top", "middle", "bottom"]}
              lineCount={5}
              lineDistance={5}
              animationSpeed={0.35}
              bendRadius={5}
              bendStrength={-0.5}
              interactive={true}
              parallax={true}
              parallaxStrength={0.15}
              linesGradient={["#001aff", "#0066ff", "#00aaff", "#00ddff"]}
              mixBlendMode="screen"
            />
            <div className="hero-content">
              <ZoomTitle text="Nicolas Escolar" start={loadingDone} />
              <motion.p className="home-subtitle" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7 }}>
                {t.subtitle}
              </motion.p>
            </div>
          </section>

          <AboutSection lang={lang} />
          <SkillsSection lang={lang} />
          <ProjectsSection lang={lang} />
        </>
      )}
    </div>
  );
}