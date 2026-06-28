'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * ScrollManager
 * - Disables browser scroll restoration so refreshes always start at the top
 * - On every route change: scroll to top (instantly), or to the hash section if present
 * - Works with Lenis: prefers lenis.scrollTo() so the smooth-scroll state stays in sync
 */
export default function ScrollManager() {
  const pathname = usePathname();
  const isFirstLoad = useRef(true);

  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    const lenis = window.__lenis;
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(0, { immediate: true, force: true });
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const scrollToHash = (hash) => {
    if (!hash) return false;
    const id = hash.replace('#', '');
    const el = document.getElementById(id);
    if (!el) return false;

    const lenis = window.__lenis;
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(el, { offset: -80, duration: 1.05 });
    } else {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    return true;
  };

  // Disable browser scroll-restoration on mount (handles refreshes/back-forward)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Force top on initial load / refresh
    scrollToTop();
  }, []);

  // Handle route + searchParams changes (App Router)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hash = window.location.hash;

    // Defer to next frame so the destination page has mounted its sections
    const id = requestAnimationFrame(() => {
      if (hash) {
        const ok = scrollToHash(hash);
        if (!ok) scrollToTop();
      } else {
        scrollToTop();
      }
    });

    // On the very first load, also re-assert top after a tick (covers async hydration)
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      setTimeout(scrollToTop, 60);
    }

    return () => cancelAnimationFrame(id);
  }, [pathname]);

  // Intercept hash anchor clicks within the page so Lenis handles them
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href*="#"]');
      if (!a) return;
      const url = new URL(a.href, window.location.href);
      // Only handle in-page anchors on the SAME pathname
      if (url.pathname === window.location.pathname && url.hash) {
        const id = url.hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          const lenis = window.__lenis;
          if (lenis && typeof lenis.scrollTo === 'function') {
            lenis.scrollTo(el, { offset: -80, duration: 1.05 });
          } else {
            const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top, behavior: 'smooth' });
          }
          // Keep the hash in the URL for bookmarking
          history.replaceState(null, '', url.hash);
        }
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
