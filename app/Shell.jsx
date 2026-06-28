'use client';
import Particles from '@/components/Particles';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollManager from '@/components/ScrollManager';
import Loader from '@/components/Loader';
import Nav from '@/components/Nav';

export default function Shell({ children }) {
  return (
    <div className="relative grain vignette min-h-screen">
      <Loader />
      <SmoothScroll />
      <ScrollManager />
      <div className="aurora" />
      <Particles />
      {/* Nav lives at the Shell level so it is NEVER inside a transformed
          (Framer Motion template) wrapper — guarantees position: fixed works. */}
      <Nav />
      {children}
    </div>
  );
}
