'use client';
import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    // Intersection Observer para animaciones al scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Optimización: dejar de observar
          }
        });
      },
      { 
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observar elementos con clase animate-on-scroll
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    // Back to top button visibility
    const backToTop = document.getElementById('backToTop');
    const toggleBackToTop = () => {
      if (backToTop) {
        backToTop.dataset.visible = window.scrollY > 400 ? 'true' : 'false';
      }
    };
    
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.unobserve(el);
      });
      window.removeEventListener('scroll', toggleBackToTop);
    };
  }, []);

  return null;
}