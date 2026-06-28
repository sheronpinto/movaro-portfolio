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
      transition={{ duration: 0.7, ease, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-[background,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? 'bg-[#050505]/70 backdrop-blur-xl border-b border-white/5'
          : 'bg-[#050505]/25 border-b border-white/0'
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link href="/" prefetch className="text-lg tracking-[0.2em] font-semibold transition-opacity hover:opacity-80">
          MOVARO<span className="text-[#8E7B4B]">®</span>
        </Link>
        <div className="flex items-center gap-10 md:gap-16 lg:gap-20">
          <nav className="hidden md:flex items-center gap-10 lg:gap-14 text-sm text-[#BDBDBD]">
            <Link href="/#work" prefetch className="nav-link">Work</Link>
            <Link href="/#about" prefetch className="nav-link">About&nbsp;Me</Link>
            <Link href="/#contact" prefetch className="nav-link">Contact</Link>
          </nav>
          <Link
            href="/#contact"
            prefetch
            className="group relative overflow-hidden rounded-full border border-white/15 px-5 py-2.5 text-sm hover:border-[#8E7B4B] hover:bg-white/[0.03] transition-all duration-200 hover:scale-[1.04]"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              Let&apos;s Talk
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
