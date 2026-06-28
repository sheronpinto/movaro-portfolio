'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  ArrowLeft, ArrowUpRight, ArrowDown,
  Instagram, Youtube, Github, Globe, ExternalLink, HardDrive
} from 'lucide-react';
import Nav from '@/components/Nav';
import { LINK_LABELS, getPreview } from '@/lib/projects';

const ease = [0.22, 1, 0.36, 1];

const linkIcon = (k) => {
  const cls = 'h-4 w-4';
  switch (k) {
    case 'instagram': return <Instagram className={cls} />;
    case 'youtube': return <Youtube className={cls} />;
    case 'github': return <Github className={cls} />;
    case 'website': return <Globe className={cls} />;
    case 'drive': return <HardDrive className={cls} />;
    case 'vimeo':
    case 'behance':
    case 'custom':
    default: return <ExternalLink className={cls} />;
  }
};

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

const FadeUp = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </motion.div>
  );
};

export default function CaseStudy({ project, next, index, total }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const op = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  const activeLinks = Object.entries(project.links || {}).filter(([, v]) => v);

  return (
    <main className="relative z-10">
      <Nav />

      {/* HERO ─ massive title + parallax thumbnail */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-end px-6 lg:px-10 pt-28 pb-20 overflow-hidden">
        <motion.div
          style={{ y, scale, opacity: op }}
          className="absolute inset-0 z-0"
        >
          <img
            src={getPreview(project)}
            alt={project.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/30 to-[#050505]" />
        </motion.div>

        <div className="relative z-10 max-w-[1500px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="flex items-center justify-between mb-10"
          >
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 text-sm text-[#BDBDBD] hover:text-white transition-colors"
             
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Work
            </Link>
            <div className="kicker">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="kicker mb-6"
          >
            ◦ {project.category} · {project.year}
          </motion.div>

          <h1 className="display text-[14vw] md:text-[10vw] leading-[0.9]">
            <SplitReveal text={project.title} delay={0.5} />
          </h1>
        </div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center z-10"
        >
          <div className="flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-[#BDBDBD]">
            WATCH
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* FULLSCREEN VIDEO */}
      <section className="px-3 md:px-6 lg:px-10">
        <FadeUp>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl ring-1 ring-white/10 bg-[#0a0a0a]">
            <video
              key={project.videoUrl}
              src={project.videoUrl}
              poster={getPreview(project)}
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              className="h-full w-full object-cover"
            />
          </div>
        </FadeUp>
      </section>

      {/* DETAILS */}
      <section className="px-6 lg:px-10 py-28 md:py-40">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24">
          <FadeUp className="lg:col-span-7 space-y-8">
            <div className="kicker">◦ About the project</div>
            <p className="text-2xl md:text-3xl leading-snug tracking-tight text-white/95">
              {project.description}
            </p>
            <p className="text-sm text-[#BDBDBD]">{project.credits}</p>
          </FadeUp>

          <FadeUp delay={0.15} className="lg:col-span-5 space-y-10">
            <div>
              <div className="kicker mb-4">Software</div>
              <div className="flex flex-wrap gap-2">
                {project.softwareUsed.map((s) => (
                  <span key={s} className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="kicker mb-2">Year</div>
                <div className="text-lg">{project.year}</div>
              </div>
              <div>
                <div className="kicker mb-2">Category</div>
                <div className="text-lg">{project.category}</div>
              </div>
            </div>

            {activeLinks.length > 0 && (
              <div>
                <div className="kicker mb-4">Links</div>
                <div className="flex flex-col gap-2">
                  {activeLinks.map(([k, v]) => (
                    <a
                      key={k}
                      href={v}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-md border border-white/10 px-4 py-3 hover:border-[#8E7B4B] hover:bg-white/5 transition-all"
                     
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
          </FadeUp>
        </div>
      </section>

      {/* NEXT PROJECT */}
      <section className="px-6 lg:px-10 pb-40">
        <FadeUp className="max-w-[1500px] mx-auto">
          <Link
            href={`/work/${next.id}`}
            className="group block"
          >
            <div className="card-lift relative overflow-hidden rounded-xl ring-1 ring-white/10 aspect-[21/8] md:aspect-[21/7]">
              <img
                src={next.thumbnail}
                alt={next.title}
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-[#050505]/30 to-[#050505]/80" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <div className="kicker mb-3">Next Project</div>
                <div className="display text-4xl md:text-7xl tracking-tight">{next.title}</div>
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-[#BDBDBD] group-hover:text-white transition-colors">
                  {next.category} · {next.year}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </div>
          </Link>
        </FadeUp>
      </section>
    </main>
  );
}
