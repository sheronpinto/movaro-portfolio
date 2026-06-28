'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import {
  ArrowUpRight, X, Play, ArrowRight, ArrowUp,
  Instagram, Youtube, Github, Globe, ExternalLink, HardDrive
} from 'lucide-react';
import { PROJECTS, LINK_LABELS } from '@/lib/projects';
import Cursor from '@/components/Cursor';
import Particles from '@/components/Particles';
import SmoothScroll from '@/components/SmoothScroll';

const ease = [0.22, 1, 0.36, 1];

// ───────────────────────────────────────────────────────────── helpers
const SplitReveal = ({ text, className = '', delay = 0 }) => {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="mask-reveal align-bottom mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1, ease, delay: delay + i * 0.06 }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

const FadeUp = ({ children, delay = 0, y = 24, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </motion.div>
  );
};

// ───────────────────────────────────────────────────────────── Navbar
const Nav = ({ onContactClick }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease, delay: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-xl bg-[#050505]/60 border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="text-lg tracking-[0.2em] font-semibold">
          MOVARO<span className="text-[#8E7B4B]">®</span>
        </a>
        <nav className="hidden md:flex items-center gap-10 text-sm text-[#BDBDBD]">
          <a href="#work" className="hover:text-white transition-colors">Work</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>
        <button
          onClick={onContactClick}
          className="group relative overflow-hidden rounded-full border border-white/15 px-5 py-2.5 text-sm hover:border-[#8E7B4B] transition-colors"
        >
          <span className="relative z-10 inline-flex items-center gap-2">
            Let&apos;s Talk <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </button>
      </div>
    </motion.header>
  );
};

// ───────────────────────────────────────────────────────────── Hero
const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -120]);
  const op = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center px-6 lg:px-10 pt-32 pb-24">
      <motion.div style={{ y, opacity: op }} className="relative z-10 max-w-[1500px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease, delay: 0.2 }}
          className="kicker mb-8"
        >
          ◦ Motion Studio · Available Worldwide
        </motion.div>

        <h1 className="display text-[14vw] md:text-[10vw] lg:text-[8.6vw] leading-[0.92]">
          <div><SplitReveal text="MOTION DESIGN" delay={0.3} /></div>
          <div className="text-[#BDBDBD]"><SplitReveal text="THAT MOVES" delay={0.55} /></div>
          <div>
            <SplitReveal text="PEOPLE" delay={0.8} />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease, delay: 1.3 }}
              className="inline-block align-top text-[#8E7B4B] text-[0.55em] ml-2"
            >
              .
            </motion.span>
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 1.1 }}
          className="mt-10 max-w-xl text-base md:text-lg text-[#BDBDBD] leading-relaxed"
        >
          I craft premium motion graphics, cinematic visuals and digital experiences for brands that value
          restraint, intention and a frame worth sitting with.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 1.25 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-3 rounded-full bg-white text-black px-7 py-3.5 text-sm font-medium hover:bg-[#8E7B4B] hover:text-white transition-colors"
          >
            View Work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-3.5 text-sm hover:border-white/60 transition-colors"
          >
            Contact
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-10 left-0 right-0 flex justify-center z-10"
      >
        <div className="flex flex-col items-center gap-3 text-[11px] tracking-[0.3em] text-[#BDBDBD]">
          SCROLL
          <span className="block h-12 w-px bg-gradient-to-b from-white/40 to-transparent relative overflow-hidden">
            <motion.span
              animate={{ y: ['-100%', '100%'] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-x-0 top-0 h-1/2 bg-white"
            />
          </span>
        </div>
      </motion.div>
    </section>
  );
};

// ───────────────────────────────────────────────────────────── Project Card
const ProjectCard = ({ project, index, onOpen }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const isWide = index % 3 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1, ease }}
      className={`group cursor-pointer ${isWide ? 'md:col-span-2' : ''}`}
      onClick={() => onOpen(project)}
      data-cursor="hover"
    >
      <div className="relative overflow-hidden rounded-xl bg-[#151515] aspect-[16/10]">
        <motion.div style={{ y }} className="absolute inset-0 -m-8">
          <img
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
          />
        </motion.div>

        {/* gradient & noise overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-xl" />

        {/* hover play */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="h-16 w-16 rounded-full border border-white/40 backdrop-blur-md bg-black/30 flex items-center justify-center">
            <Play className="h-5 w-5 text-white fill-white" />
          </div>
        </div>

        {/* meta */}
        <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 flex items-end justify-between gap-6">
          <div>
            <div className="text-[11px] tracking-[0.25em] uppercase text-[#BDBDBD] mb-2">
              {project.category} · {project.year}
            </div>
            <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight">{project.title}</h3>
          </div>
          <ArrowUpRight className="h-6 w-6 text-white/70 transition-all duration-500 group-hover:text-[#8E7B4B] group-hover:-translate-y-1 group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
};

// ───────────────────────────────────────────────────────────── Work Section
const Work = ({ onOpen }) => (
  <section id="work" className="relative z-10 px-6 lg:px-10 py-32">
    <div className="max-w-[1500px] mx-auto">
      <FadeUp className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="kicker mb-4">◦ Selected Work</div>
          <h2 className="display text-5xl md:text-7xl">Featured.</h2>
        </div>
        <p className="max-w-md text-[#BDBDBD] text-base leading-relaxed">
          A selection of recent films, identities and motion studies. Each piece is built around a single idea and
          finished to a frame.
        </p>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} onOpen={onOpen} />
        ))}
      </div>
    </div>
  </section>
);

// ───────────────────────────────────────────────────────────── Project Modal
const linkIcon = (k) => {
  const cls = 'h-4 w-4';
  switch (k) {
    case 'instagram': return <Instagram className={cls} />;
    case 'youtube': return <Youtube className={cls} />;
    case 'github': return <Github className={cls} />;
    case 'website': return <Globe className={cls} />;
    case 'drive': return <HardDrive className={cls} />;
    default: return <ExternalLink className={cls} />;
  }
};

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onEsc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onEsc);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onEsc); };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease }}
          className="fixed inset-0 z-[90] bg-black/85 backdrop-blur-xl overflow-y-auto no-scrollbar"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.7, ease }}
            className="max-w-[1300px] mx-auto px-4 md:px-10 py-8 md:py-14"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="kicker">◦ {project.category} · {project.year}</div>
                <h3 className="display text-4xl md:text-6xl mt-3">{project.title}</h3>
              </div>
              <button
                onClick={onClose}
                className="h-12 w-12 rounded-full border border-white/15 flex items-center justify-center hover:border-[#8E7B4B] hover:bg-white/5 transition-all"
                data-cursor="hover"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <motion.div
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#0a0a0a] ring-1 ring-white/10"
            >
              <video
                key={project.videoUrl}
                src={project.videoUrl}
                poster={project.thumbnail}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="h-full w-full object-cover"
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
              <div className="md:col-span-2">
                <div className="kicker mb-3">About</div>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">{project.description}</p>
                <p className="text-sm text-[#BDBDBD] mt-6">{project.credits}</p>
              </div>
              <div className="space-y-8">
                <div>
                  <div className="kicker mb-3">Software</div>
                  <div className="flex flex-wrap gap-2">
                    {project.software.map((s) => (
                      <span key={s} className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                {Object.keys(project.links || {}).length > 0 && (
                  <div>
                    <div className="kicker mb-3">Links</div>
                    <div className="flex flex-col gap-2">
                      {Object.entries(project.links).map(([k, v]) => v && (
                        <a
                          key={k}
                          href={v}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between rounded-md border border-white/10 px-4 py-3 hover:border-[#8E7B4B] hover:bg-white/5 transition-all"
                          data-cursor="hover"
                        >
                          <span className="inline-flex items-center gap-3 text-sm">
                            {linkIcon(k)} {LINK_LABELS[k] || k}
                          </span>
                          <ArrowUpRight className="h-4 w-4 opacity-60 group-hover:opacity-100 group-hover:text-[#8E7B4B] transition" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ───────────────────────────────────────────────────────────── About + Counters
const Counter = ({ value, suffix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1800;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return <span ref={ref}>{n}{suffix}</span>;
};

const About = () => (
  <section id="about" className="relative z-10 px-6 lg:px-10 py-32 border-t border-white/5">
    <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
      <FadeUp className="lg:col-span-5">
        <div className="kicker mb-4">◦ About</div>
        <h2 className="display text-5xl md:text-6xl">A studio of one,<br />built for the frame.</h2>
      </FadeUp>
      <FadeUp delay={0.15} className="lg:col-span-7 space-y-6 text-[#BDBDBD] text-lg leading-relaxed">
        <p>
          MOVARO is an independent motion practice making cinematic work for brands, agencies and artists who value
          restraint over noise. Every project starts with a single idea and ends with a frame you&apos;d hang on a wall.
        </p>
        <p>
          From bespoke 3D type and product films to identity systems and title sequences, the work spans disciplines
          but holds to one rule — beautiful timing, beautifully timed.
        </p>
      </FadeUp>
    </div>

    <div className="max-w-[1500px] mx-auto mt-24 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6">
      {[
        { v: 120, s: '+', l: 'Projects' },
        { v: 38, s: '+', l: 'Templates' },
        { v: 6, s: '', l: 'Years Learning' },
        { v: 42, s: '+', l: 'Clients' }
      ].map((it, i) => (
        <FadeUp key={i} delay={i * 0.1}>
          <div className="display text-5xl md:text-6xl">
            <Counter value={it.v} suffix={it.s} />
          </div>
          <div className="kicker mt-3">{it.l}</div>
        </FadeUp>
      ))}
    </div>
  </section>
);

// ───────────────────────────────────────────────────────────── Contact
const PROJECT_TYPES = ['Brand Film', 'Product Reveal', 'Title Sequence', '3D / Motion', 'Editorial', 'Other'];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', projectType: PROJECT_TYPES[0], message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errMsg, setErrMsg] = useState('');

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending'); setErrMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error'); setErrMsg(data.error || 'Something went wrong.');
      } else {
        setStatus('sent');
      }
    } catch {
      setStatus('error'); setErrMsg('Network error.');
    }
  };

  return (
    <section id="contact" className="relative z-10 px-6 lg:px-10 py-32 border-t border-white/5">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <FadeUp className="lg:col-span-5">
          <div className="kicker mb-4">◦ Contact</div>
          <h2 className="display text-5xl md:text-7xl leading-[0.95]">
            Let&apos;s make<br />something<br />worth watching.
          </h2>
          <p className="mt-8 text-[#BDBDBD] max-w-md leading-relaxed">
            Brand films, product reveals, title sequences, or just a hello. Tell me about your project — I respond
            within 24 hours.
          </p>
          <div className="mt-10 space-y-2 text-sm">
            <div className="text-[#BDBDBD]">Email</div>
            <a href="mailto:sheronpinto588@gmail.com" className="text-lg hover:text-[#8E7B4B] transition-colors">
              sheronpinto588@gmail.com
            </a>
          </div>
        </FadeUp>

        <FadeUp delay={0.1} className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease }}
                className="relative rounded-2xl border border-[#8E7B4B]/30 bg-gradient-to-b from-[#151515] to-[#0a0a0a] p-12 md:p-16 text-center"
              >
                <div className="kicker text-[#8E7B4B]">◦ Message received</div>
                <h3 className="display text-3xl md:text-5xl mt-6">
                  Let&apos;s make something<br />worth watching.
                </h3>
                <p className="mt-6 text-[#BDBDBD] max-w-md mx-auto">
                  Thank you, {form.name || 'friend'}. I&apos;ll be in touch from sheronpinto588@gmail.com shortly.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Name">
                    <input
                      required value={form.name} onChange={onChange('name')}
                      className="bare-input" placeholder="Your full name"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      required type="email" value={form.email} onChange={onChange('email')}
                      className="bare-input" placeholder="you@studio.com"
                    />
                  </Field>
                </div>
                <Field label="Project Type">
                  <select
                    value={form.projectType} onChange={onChange('projectType')}
                    className="bare-input appearance-none"
                  >
                    {PROJECT_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </Field>
                <Field label="Message">
                  <textarea
                    required rows={5} value={form.message} onChange={onChange('message')}
                    className="bare-input resize-none" placeholder="Tell me about your project, timeline and vibe."
                  />
                </Field>

                {status === 'error' && (
                  <p className="text-sm text-red-400">{errMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group inline-flex items-center gap-3 rounded-full bg-white text-black px-8 py-4 text-sm font-medium hover:bg-[#8E7B4B] hover:text-white transition-colors disabled:opacity-50"
                  data-cursor="hover"
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </FadeUp>
      </div>

      <style jsx>{`
        .bare-input {
          width: 100%;
          background: transparent;
          color: white;
          border: 0;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          padding: 14px 0;
          font-size: 16px;
          outline: none;
          transition: border-color 300ms ease;
        }
        .bare-input::placeholder { color: rgba(189,189,189,0.5); }
        .bare-input:focus { border-color: #8E7B4B; }
        select.bare-input { background: transparent; }
        select.bare-input option { background: #101010; color: white; }
      `}</style>
    </section>
  );
};

const Field = ({ label, children }) => (
  <label className="block">
    <span className="kicker">{label}</span>
    <div className="mt-2">{children}</div>
  </label>
);

// ───────────────────────────────────────────────────────────── Footer
const Footer = () => (
  <footer className="relative z-10 px-6 lg:px-10 py-16 border-t border-white/5">
    <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-end">
      <div>
        <div className="text-lg tracking-[0.2em] font-semibold">MOVARO<span className="text-[#8E7B4B]">®</span></div>
        <div className="kicker mt-3">Available Worldwide</div>
      </div>
      <div className="flex flex-wrap gap-6 md:justify-center text-sm text-[#BDBDBD]">
        <a href="mailto:sheronpinto588@gmail.com" className="hover:text-white">Email</a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a>
        <a href="https://behance.net" target="_blank" rel="noreferrer" className="hover:text-white">Behance</a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white">YouTube</a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
      </div>
      <div className="md:text-right">
        <a
          href="#top"
          className="inline-flex items-center gap-2 text-sm text-[#BDBDBD] hover:text-white transition-colors"
          data-cursor="hover"
        >
          Back to top <ArrowUp className="h-4 w-4" />
        </a>
        <div className="kicker mt-4">© {new Date().getFullYear()} Movaro Studio</div>
      </div>
    </div>
  </footer>
);

// ───────────────────────────────────────────────────────────── App
function App() {
  const [open, setOpen] = useState(null);
  const onContactClick = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="relative grain vignette">
      <SmoothScroll />
      <Cursor />
      <div className="aurora" />
      <Particles />

      <Nav onContactClick={onContactClick} />
      <main className="relative z-10">
        <Hero />
        <Work onOpen={setOpen} />
        <Contact />
        <About />
      </main>
      <Footer />
      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </div>
  );
}

export default App;
