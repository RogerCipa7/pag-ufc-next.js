import { Linkedin, Github, Globe } from 'lucide-react';
import { useMemo } from 'react';

export default function Footer() {
  // Memoizamos los enlaces sociales para evitar recreaciones innecesarias
  const socialLinks = useMemo(
    () => [
      {
        href: 'https://www.linkedin.com/in/roger-cipagauta-b1626b329/',
        label: 'LinkedIn',
        icon: Linkedin,
        ariaLabel: 'LinkedIn de Roger Cipagauta',
      },
      {
        href: 'https://github.com/RogerCipa7',
        label: 'GitHub',
        icon: Github,
        ariaLabel: 'GitHub de Roger Cipagauta',
      },
      {
        href: 'https://portafoliorc.netlify.app/',
        label: 'Portafolio',
        icon: Globe,
        ariaLabel: 'Portafolio de Roger Cipagauta',
      },
    ],
    []
  );

  return (
    <footer className="bg-ufc-black border-t border-ufc-gold/20 py-10 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
        {/* Divider accent con animación suave al hover */}
        <div className="w-12 h-[2px] bg-ufc-red rounded-full transition-all duration-300 hover:w-16 hover:bg-red-600" />

        {/* Social and portfolio links */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          {socialLinks.map(({ href, label, icon: Icon, ariaLabel }, index) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-ufc-gray hover:text-ufc-white transition-colors duration-200"
              aria-label={ariaLabel}
            >
              <span
                className={`p-2 rounded-full border border-ufc-gray/30 group-hover:border-ufc-gold group-hover:text-ufc-gold transition-all duration-500 animate-float`}
                style={{ animationDelay: `${index * 150}ms`, animationDuration: '4s' }}
              >
                <Icon size={18} />
              </span>
              <span className="text-sm font-medium tracking-wide">{label}</span>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-ufc-gray/50 text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} UFC Portfolio Project — Desarrollado para demostración
        </p>
      </div>
    </footer>
  );
}