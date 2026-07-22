import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

const SKILLS = {
  "Frontend": ["ReactJS", "Next.js", "Flutter", "HTML5", "CSS3"],
  "Backend": ["Node.js", "Express.js", "REST APIs"],
  "Data & ML": ["Python", "Pandas", "NumPy", "Scikit-learn", "EDA"],
  "Databases": ["MongoDB", "Firebase", "SQLite", "SQL"],
  "Tools": ["Git", "GitHub", "Postman", "JWT", "Bcrypt", "Resend"],
};

const PROJECTS = [
  {
    name: "BreakBite",
    tag: "Full-Stack · Live",
    stack: ["Flutter", "Firebase", "FCM", "Node.js", "MongoDB"],
    desc: "End-to-end canteen ordering platform with real-time order tracking and push notifications via FCM. Serves real campus users.",
    accent: "#D4A843",
    repo: "https://github.com/Farhan-Shaikh-25/BreakBite",
    live: "https://breakbite-c33c3.web.app",
  },
  {
    name: "KeepTask",
    tag: "Full-Stack · Live",
    stack: ["React", "Node.js", "JWT", "MongoDB"],
    desc: "Secure task management app with access/refresh token auth strategy, bcrypt hashing, and full CRUD. Deployed on Netlify.",
    accent: "#D4A843",
    repos: [
      { label: "Frontend", href: "https://github.com/Farhan-Shaikh-25/TodoFrontend" },
      { label: "Backend", href: "https://github.com/Farhan-Shaikh-25/TodoBackend" },
    ],
    live: "https://keeptask.netlify.app",
  },
  {
    name: "Teacher Audit",
    tag: "Flutter · Next.js · Live",
    stack: ["Flutter", "Dart", "SQLite", "Google Drive API", "Next.js 14", "Tailwind CSS", "Resend"],
    desc: "Time tracking app for teachers with offline-first SQLite storage and cross-device sync via Google Drive. Includes a polished Next.js landing page with a Resend-powered contact form, deployed on Vercel.",
    accent: "#D4A843",
    repos: [
      { label: "App", href: "https://github.com/Farhan-Shaikh-25/TeacherAudit" },
      { label: "Landing", href: "https://github.com/Farhan-Shaikh-25/TeacherAuditLandingPage" },
    ],
    live: "https://teacher-audit.vercel.app",
  },
  {
    name: "Zaid Tailoring",
    tag: "Client Work · Live",
    stack: ["HTML5", "CSS3", "JavaScript"],
    desc: "Production business website for a UAE-based client. Fully responsive with animated sections — designed, built, and deployed solo.",
    accent: "#D4A843",
    live: "https://zaidtailoring.netlify.app",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Grain() {
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat", backgroundSize: "128px 128px", opacity: 0.5,
      }}
    />
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.dataset.section); });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll("[data-section]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("farhanshaikh25.fs@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="main-body">
      <Grain />

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: #D4A843; color: #0C0C0C; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #111; } ::-webkit-scrollbar-thumb { background: #D4A843; border-radius: 2px; }

        .nav-link { font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase; color: #C2C2C2; cursor: pointer; transition: color 0.25s; background: none; border: none; padding: 0; }
        .nav-link:hover, .nav-link.active { color: #D4A843; }

        .skill-tag { font-family: 'DM Mono', monospace; font-size: 11px; border: 1px solid #222; padding: 6px 14px; border-radius: 2px; color: #C2C2C2; transition: border-color 0.2s, color 0.2s; display: inline-block; }
        .skill-tag:hover { border-color: #D4A843; color: #D4A843; }

        .project-card:hover { border-color: #D4A843; transform: translateY(-3px); }

        .gold { color: #D4A843; }
        .mono { font-family: 'DM Mono', monospace; }

        .hero-name { font-size: clamp(52px, 9vw, 120px); line-height: 0.9; letter-spacing: -0.02em; }
        .hero-sub { font-family: 'DM Mono', monospace; font-size: 12px; letter-spacing: 0.15em; color: #C2C2C2; }

        .contact-btn { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; border: 1px solid #333; padding: 14px 28px; background: transparent; color: #C2C2C2; cursor: pointer; transition: all 0.25s; border-radius: 2px; }
        .contact-btn:hover { border-color: #D4A843; color: #D4A843; }
        .contact-btn.primary { border-color: #D4A843; color: #D4A843; }
        .contact-btn.primary:hover { background: #D4A843; color: #0C0C0C; }

        .divider { width: 100%; height: 1px; background: #1A1A1A; }
        .dot { width: 5px; height: 5px; border-radius: 50%; background: #D4A843; display: inline-block; margin-right: 8px; }

        .section-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #C2C2C2; }
        .section-number { font-family: 'DM Mono', monospace; font-size: 11px; color: #D4A843; }

        /* Update .project-card to fill full height and push bottom content down */
.project-card { 
  border: 1px solid #1A1A1A; 
  padding: 36px; 
  border-radius: 4px; 
  transition: border-color 0.3s, transform 0.3s; 
  cursor: default; 
  background: #0E0E0E; 
  display: flex; 
  flex-direction: column; 
  justify-content: space-between; 
  height: 100%; 
}

/* Ensure FadeIn wrapper stretches to equalize card heights in grid */
.grid-2 > div {
  display: flex;
  flex-direction: column;
}

/* Stack pill styling */
.stack-pill { 
  font-family: 'DM Mono', monospace; 
  font-size: 10px; 
  letter-spacing: 0.06em; 
  background: #161616; 
  border: 1px solid #222; 
  padding: 3px 10px; 
  border-radius: 2px; 
  color: #C2C2C2; 
  white-space: nowrap; /* Prevents text inside pills from breaking */
}
        .main-body {
          background: #0C0C0C;
          color: #E8E2D9;
          font-family: 'DM Serif Display', Georgia, serif;
          min-height: 100vh;
          overflow-x: hidden;
          padding-top: 80px;
        }

        @media (max-width: 768px) {
          .hero-name { font-size: clamp(40px, 13vw, 72px); }
          .grid-2 { grid-template-columns: 1fr !important; }
        }

      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(12,12,12,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #1A1A1A" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="dot" />
          <span className="mono" style={{ fontSize: 12, color: "#666", letterSpacing: "0.08em" }}>MFS</span>
        </div>
        {/* Desktop */}
        <div style={{ display: "flex", gap: 36 }} className="desktop-nav">
          {NAV_LINKS.map((l) => (
            <button key={l} className={`nav-link${active === l ? " active" : ""}`} onClick={() => scrollTo(l)}>{l}</button>
          ))}
        </div>
        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 4 }} className="mobile-menu-btn">
          <div style={{ width: 22, height: 1, background: "#C2C2C2", marginBottom: 6, transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translate(5px, 4px)" : "none" }} />
          <div style={{ width: 22, height: 1, background: "#C2C2C2", transition: "all 0.2s", opacity: menuOpen ? 0 : 1 }} />
          <div style={{ width: 22, height: 1, background: "#C2C2C2", marginTop: 6, transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translate(5px, -4px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 90, background: "#0C0C0C", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}>
          {NAV_LINKS.map((l) => (
            <button key={l} className={`nav-link${active === l ? " active" : ""}`} style={{ fontSize: 14 }} onClick={() => scrollTo(l)}>{l}</button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>

      {/* ─── HERO ─── */}
      <section id="about" data-section="About" style={{ minHeight: "fit-content", display: "flex", flexDirection: "column", justifyContent: "flex-start", padding: "0 40px 80px", position: "relative" }}>
        {/* Decorative line */}
        <div style={{ position: "absolute", top: "18%", right: 40, width: 1, height: 120, background: "linear-gradient(to bottom, transparent, #D4A843, transparent)" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <FadeIn delay={0.1}>
            <p className="hero-sub" style={{ marginBottom: 24 }}>
              ◈ &nbsp; Computer Science Sophomore &nbsp;·&nbsp; Mithibai College, Mumbai &nbsp;·&nbsp; CGPA 9.0
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <h1 className="hero-name">
              Mohammed<br />
              <span style={{ fontStyle: "italic", color: "#D4A843" }}>Farhan</span><br />
              Shaikh
            </h1>
          </FadeIn>
          <FadeIn delay={0.45}>
            <div style={{ marginTop: 48, maxWidth: 540 }}>
              <div className="divider" style={{ marginBottom: 28 }} />
              <p className="mono" style={{ fontSize: 13, lineHeight: 1.8, color: "#C2C2C2" }}>
                I build full-stack applications and data-driven systems end-to-end —
                from UI to backend to deployment. Currently exploring the intersection of
                software engineering and machine learning.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.6}>
            <div style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap" }}>
              <button className="contact-btn primary" onClick={() => scrollTo("Contact")}>Get in touch</button>
              <button className="contact-btn" onClick={() => scrollTo("Projects")}>View work</button>
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 40, right: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span className="mono" style={{ fontSize: 9, color: "#C2C2C2", letterSpacing: "0.15em", writingMode: "vertical-rl" }}>SCROLL</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #333, transparent)" }} />
        </div>
      </section>

      <div className="divider" style={{ margin: "0 40px" }} />

      {/* ─── SKILLS ─── */}
      <section id="skills" data-section="Skills" style={{ padding: "120px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 72 }}>
            <span className="section-number">02</span>
            <span className="section-label">Skills</span>
            <div style={{ flex: 1, height: 1, background: "#1A1A1A", marginLeft: 12 }} />
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48 }}>
          {Object.entries(SKILLS).map(([cat, items], i) => (
            <FadeIn key={cat} delay={i * 0.1}>
              <div>
                <p className="mono" style={{ fontSize: 10, letterSpacing: "0.15em", color: "#D4A843", marginBottom: 20, textTransform: "uppercase" }}>{cat}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {items.map((s) => <span key={s} className="skill-tag">{s}</span>)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="divider" style={{ margin: "0 40px" }} />

      {/* ─── PROJECTS ─── */}
      <section id="projects" data-section="Projects" style={{ padding: "120px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 72 }}>
            <span className="section-number">03</span>
            <span className="section-label">Projects</span>
            <div style={{ flex: 1, height: 1, background: "#1A1A1A", marginLeft: 12 }} />
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "auto auto", gap: 20 }} className="grid-2">
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.1}>
              <div className="project-card">

                {/* Top Half: Header & Description */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 400, letterSpacing: "-0.01em" }}>{p.name}</h3>
                    <span className="mono" style={{ fontSize: 9, color: "#C2C2C2", letterSpacing: "0.12em", textTransform: "uppercase" }}>{p.tag}</span>
                  </div>
                  <p className="mono" style={{ fontSize: 12, lineHeight: 1.85, color: "#C2C2C2", marginBottom: 28 }}>{p.desc}</p>
                </div>

                {/* Bottom Half: Stack Pills + Action Links */}
                <div style={{ marginTop: "auto", paddingTop: 16 }}>
                  {/* Tech Stack Wrapper */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                    {p.stack.map((s) => <span key={s} className="stack-pill">{s}</span>)}
                  </div>

                  {/* Links Wrapper */}
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noreferrer" className="mono" style={{ fontSize: 10, color: "#C2C2C2", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={e => e.target.style.color = "#D4A843"} onMouseLeave={e => e.target.style.color = "#C2C2C2"}>
                        Repo ↗
                      </a>
                    )}
                    {p.repos && p.repos.map((r) => (
                      <a key={r.label} href={r.href} target="_blank" rel="noreferrer" className="mono" style={{ fontSize: 10, color: "#C2C2C2", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={e => e.target.style.color = "#D4A843"} onMouseLeave={e => e.target.style.color = "#C2C2C2"}>
                        {r.label} ↗
                      </a>
                    ))}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer" className="mono" style={{ fontSize: 10, color: "#D4A843", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", opacity: 0.8, transition: "opacity 0.2s" }}
                        onMouseEnter={e => e.target.style.opacity = "1"} onMouseLeave={e => e.target.style.opacity = "0.8"}>
                        Live ↗
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="divider" style={{ margin: "0 40px" }} />

      {/* ─── CONTACT ─── */}
      <section id="contact" data-section="Contact" style={{ padding: "120px 40px 160px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 80 }}>
            <span className="section-number">04</span>
            <span className="section-label">Contact</span>
            <div style={{ flex: 1, height: 1, background: "#1A1A1A", marginLeft: 12 }} />
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="grid-2">
          <FadeIn delay={0.1}>
            <div>
              <h2 style={{ fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 24 }}>
                Let's build<br /><span style={{ fontStyle: "italic", color: "#D4A843" }}>something</span><br />together.
              </h2>
              <p className="mono" style={{ fontSize: 12, color: "#C2C2C2", lineHeight: 1.8, maxWidth: 340 }}>
                Open to internships, collaborations, and interesting problems. If you have one, reach out.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Email", value: "farhanshaikh25.fs@gmail.com", action: copyEmail, actionLabel: copiedEmail ? "Copied!" : "Copy" },
                { label: "Phone", value: "+91 9136511290" },
              ].map((item) => (
                <div key={item.label} style={{ border: "1px solid #1A1A1A", padding: "20px 24px", borderRadius: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p className="mono" style={{ fontSize: 9, color: "#C2C2C2", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>{item.label}</p>
                    <p className="mono" style={{ fontSize: 13, color: "#C2C2C2" }}>{item.value}</p>
                  </div>
                  {item.action && (
                    <button className="contact-btn" style={{ padding: "8px 16px", fontSize: 10 }} onClick={item.action}>
                      {item.actionLabel}
                    </button>
                  )}
                </div>
              ))}

              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                {[
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/mohammed-farhan-shaikh25" },
                  { label: "GitHub", href: "https://github.com/Farhan-Shaikh-25" },
                ].map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                    <button className="contact-btn" style={{ width: "100%" }}>{link.label}</button>
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <div style={{ borderTop: "1px solid #1A1A1A", padding: "24px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="mono" style={{ fontSize: 10, color: "#C2C2C2" }}>Mohammed Farhan Shaikh</span>
        <span className="mono" style={{ fontSize: 10, color: "#C2C2C2" }}>Mumbai, IN</span>
      </div>
    </div>
  );
}