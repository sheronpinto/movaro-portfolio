'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export default function Loader() {
  // Start hidden by default to avoid SSR mismatch / flash for returning visitors.
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    let seen = false;
    try { seen = !!sessionStorage.getItem('sheron_loaded'); } catch {}
    if (seen) return;
    setShow(true);
    const t = setTimeout(() => {
      setShow(false);
      try { sessionStorage.setItem('sheron_loaded', '1'); } catch {}
    }, 2600);
    return () => clearTimeout(t);
  }, []);

  // Lock body scroll while loader is visible
  useEffect(() => {
    if (!ready) return;
    const prev = document.body.style.overflow;
    if (show) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = prev || '';
    return () => { document.body.style.overflow = prev; };
  }, [show, ready]);

  if (!ready) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(24px)' }}
          transition={{ duration: 0.9, ease }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* soft floating light */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1.1 }}
            transition={{ duration: 2.2, ease }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vmin] h-[80vmin] rounded-full bg-[#8E7B4B]/12 blur-[120px]"
          />

          {/* drifting tiny particles */}
          {[...Array(18)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                x: (Math.random() - 0.5) * 280,
                y: (Math.random() - 0.5) * 280
              }}
              transition={{ duration: 2.4, ease: 'easeOut', delay: 0.2 + Math.random() * 0.6 }}
              className="absolute left-1/2 top-1/2 h-[3px] w-[3px] rounded-full bg-white/60"
              style={{
                boxShadow: '0 0 12px rgba(255,255,255,0.25)'
              }}
            />
          ))}

          {/* horizontal sweep line */}
          <motion.span
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, ease, delay: 0.15 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-[60vmin] origin-left"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.65), rgba(142,123,75,0.7), transparent)'
            }}
          />

          {/* MOVARO wipe-reveal */}
          <div className="relative text-center">
            <div className="overflow-hidden">
              <motion.div
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={{ clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 1.4, ease, delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold tracking-[0.18em] inline-block"
              >
                SHERON PINTO<span className="text-[#8E7B4B]">®</span>
              </motion.div>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease, delay: 0.9 }}
              className="h-px mt-6 mx-auto w-[260px] md:w-[420px] origin-center"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(142,123,75,0.7), transparent)'
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 1.5 }}
              className="mt-5 text-[10px] tracking-[0.45em] uppercase text-[#BDBDBD]"
            >
              Motion Designer
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
