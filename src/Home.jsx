import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardFooter, Image, Button } from "@heroui/react";
import ingeniaPrintImg from "./assets/IngeniaPrint.png";
import ScouterImg from "./assets/Scouter.png";
import "./Home.css";

// ============================================================
// PROYECTOS — config manual
// ============================================================
const GITHUB_USER = import.meta.env.VITE_GITHUB_USER;
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const REPOS_CONFIG = [
  { name: "Ingenia-Print-Campus", customImage: ingeniaPrintImg },
  { name: "GestorEntrenamientos",  customImage: null },
  { name: "Scouter",               customImage: ScouterImg },
];

// ============================================================
// SKILLS DATA — SVG icons inline
// ============================================================
const SKILLS = [
  // JavaScript, Java, SQL, Node.js, Express.js, HTML, CSS, Python, Tailwind CSS
];

// ============================================================
// ZOOM TITLE
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
function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const increment = current < 70 ? Math.random() * 4 + 2 : Math.random() * 1.5 + 0.3;
      current = Math.min(current + increment, 100);
      setProgress(Math.floor(current));
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => setDone(true), 600);
        setTimeout(() => {
          setVisible(false);
          if (onFinish) onFinish();
        }, 1400);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const neonColor = `hsl(${120 + progress * 1.2}, 100%, 55%)`;
  const glowStrength = `0 0 8px ${neonColor}, 0 0 20px ${neonColor}, 0 0 45px ${neonColor}60`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="loader-wrapper"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="loader-grain" />
          <div className="loader-ambient" style={{ background: `radial-gradient(circle, ${neonColor}08 0%, transparent 70%)` }} />
          <motion.div className="loader-percentage" animate={{ opacity: done ? 0 : 1 }} transition={{ duration: 0.3 }} style={{ color: neonColor, textShadow: glowStrength }}>
            {progress}
            <span className="loader-percentage-symbol">%</span>
          </motion.div>
          <div className="loader-bar-container">
            <div className="loader-bar-labels" style={{ color: `${neonColor}80` }}>
              <span>Cargando</span>
              <span>{progress < 100 ? "Inicializando..." : "Listo ✦"}</span>
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
// PROJECTS SECTION
// ============================================================
function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const results = await Promise.all(
          REPOS_CONFIG.map(({ name }) =>
            fetch(`https://api.github.com/repos/${GITHUB_USER}/${name}`, {
              headers: { Authorization: `token ${TOKEN}` },
            }).then(r => r.json())
          )
        );
        const merged = results.map(repo => {
          const config = REPOS_CONFIG.find(r => r.name === repo.name);
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

  if (loading) return <section className="projects-section"><p className="projects-loading">Cargando proyectos...</p></section>;

  const featured = projects[0];
  const rest = projects.slice(1, 3);

  return (
    <motion.section className="projects-section" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: "easeOut" }}>
      <div className="projects-header">
        <span className="section-number-label">02</span>
        <h3 className="section-title">Proyectos</h3>
      </div>

      {/* Featured — 1 grande */}
      {featured && (
        <motion.div className="project-card-wrapper project-card-featured" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <a href={featured.html_url} target="_blank" rel="noopener noreferrer" className="project-card-link">
            <Card isFooterBlurred className="project-card">
              <Image removeWrapper alt={featured.name} className="project-card-img project-card-img-featured" src={getImage(featured)} />
              <CardFooter className="project-card-footer">
                <div className="project-footer-info">
                  <p className="project-footer-title">{featured.name.replace(/-/g, " ")}</p>
                  <p className="project-footer-desc">{featured.description ? featured.description.substring(0, 80) + "..." : "Ver en GitHub"}</p>
                </div>
                <Button radius="full" size="sm" color="primary">GitHub</Button>
              </CardFooter>
            </Card>
          </a>
        </motion.div>
      )}

      {/* 2 abajo */}
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
                    <p className="project-footer-desc">{project.description ? project.description.substring(0, 55) + "..." : "Ver en GitHub"}</p>
                  </div>
                  <Button radius="full" size="sm" color="primary">GitHub</Button>
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
// SKILLS SECTION
// ============================================================
function SkillsSection() {
  return (
    <motion.section className="skills-section" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
      <div className="skills-header">
        <span className="section-number-label">01</span>
        <h3 className="section-title">Skills</h3>
      </div>
      <div className="skills-grid">
        {SKILLS.map((skill) => (
          <motion.div key={skill.name} className="skill-card" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            <div className="skill-icon" style={{ color: skill.color }}>{skill.svg}</div>
            <p>{skill.name}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ============================================================
// HOME PAGE
// ============================================================
export default function Home() {
  const [loadingDone, setLoadingDone] = useState(false);

  return (
    <div className="home-page">
      {!loadingDone && <LoadingScreen onFinish={() => setLoadingDone(true)} />}
      {loadingDone && (
        <>
          <ZoomTitle text="Hola, soy Nico" start={loadingDone} />
          <SkillsSection />
          <ProjectsSection />
        </>
      )}
    </div>
  );
}