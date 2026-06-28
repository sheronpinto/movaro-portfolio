'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

export default function Nav() {
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
      transition={{ duration: 1, ease, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-xl bg-[#050505]/60 border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="text-lg tracking-[0.2em] font-semibold" data-cursor="hover">
          MOVARO<span className="text-[#8E7B4B]">®</span>
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-sm text-[#BDBDBD]">
          <Link href="/#work" className="hover:text-white transition-colors">Work</Link>
          <Link href="/#about" className="hover:text-white transition-colors">About</Link>
          <Link href="/#contact" className="hover:text-white transition-colors">Contact</Link>
        </nav>
        <Link
          href="/#contact"
          className="group relative overflow-hidden rounded-full border border-white/15 px-5 py-2.5 text-sm hover:border-[#8E7B4B] transition-colors"
          data-cursor="hover"
        >
          <span className="relative z-10 inline-flex items-center gap-2">
            Let&apos;s Talk
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </Link>
      </div>
    </motion.header>
  );
}
