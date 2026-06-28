'use client';
import Particles from '@/components/Particles';
import SmoothScroll from '@/components/SmoothScroll';
import Loader from '@/components/Loader';

export default function Shell({ children }) {
  return (
    <div className="relative grain vignette min-h-screen">
      <Loader />
      <SmoothScroll />
      <div className="aurora" />
      <Particles />
      {children}
    </div>
  );
}
