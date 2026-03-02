'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Menu, X, Search, User } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname(); // 👈 Obtenemos la ruta actual
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Usamos useRef para lastScrollY para no depender de él en el efecto
  const lastScrollY = useRef(0);
  // Referencia para el frame de animación (throttling)
  const ticking = useRef(false);

  // Memoizamos los enlaces para evitar recreaciones innecesarias
  const navLinks = useMemo(
    () => [
      { href: '/', label: 'Inicio' },
      { href: '/fighters', label: 'Luchadores' },
      { href: '/disciplines', label: 'Disciplinas' },
    ],
    []
  );

  // Función para determinar si un enlace está activo
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Control de visibilidad y efecto scroll optimizado con requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setScrolled(currentScrollY > 20);

        if (!isOpen) {
          if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
        } else {
          setIsVisible(true);
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [isOpen]); // Solo depende de isOpen

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Prevenir scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* === NAVBAR CONTAINER PRINCIPAL (fixed, sin spacer) === */}
      <div
        className={`fixed top-0 w-full z-50 bg-ufc-black/95 backdrop-blur-md transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        {/* Top bar informativa (solo desktop) */}
        <div className="hidden lg:block bg-ufc-dark/50 border-b border-ufc-black/50">
          <div className="max-w-7xl mx-auto px-6 py-2">
            <div className="flex items-center justify-between text-xs text-ufc-gray">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                  EN VIVO: UFC Fight Night
                </span>
                <Link
                  href="https://www.ufcespanol.com/events"
                  target="_blank"
                  className="hover:text-ufc-red transition-colors"
                >
                  Ver cartelera
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="https://welcome.ufcfightpass.com/region/latam"
                  target="_blank"
                  className="hover:text-ufc-red transition-colors"
                >
                  UFC Fight Pass
                </Link>
                <Link
                  href="https://www.ufcstore.com"
                  target="_blank"
                  className="hover:text-ufc-red transition-colors"
                >
                  Tienda Oficial
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* === NAVBAR PRINCIPAL === */}
        <div
          className={`border-b border-white/5 transition-all duration-500 ${scrolled
              ? 'bg-ufc-black/40 backdrop-blur-2xl shadow-2xl shadow-black/50 py-2'
              : 'bg-transparent py-4'
            }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20 lg:h-24">
              {/* LOGO */}
              <Link
                href="/"
                className="flex items-center gap-2 group"
                aria-label="UFC Pasión - Inicio"
              >
                <span className="text-3xl lg:text-4xl font-black text-ufc-red italic tracking-tight group-hover:scale-105 transition-transform">
                  UFC
                </span>
                <span className="text-2xl lg:text-3xl font-bold text-white tracking-wide">
                  PASIÓN
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    // 👇 Eliminamos onClick y usamos isActive
                    className={`relative px-5 py-3 text-base font-semibold transition-colors duration-200 ${isActive(link.href)
                        ? 'text-ufc-red'
                        : 'text-white hover:text-ufc-red'
                      }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-ufc-red transition-all duration-300 ${isActive(link.href) ? 'w-8' : 'w-0 group-hover:w-6'
                        }`}
                    />
                  </Link>
                ))}
              </div>

              {/* Right Actions */}
              <div className="hidden lg:flex items-center gap-3">
                <button
                  className="p-3 text-white hover:text-ufc-red hover:bg-ufc-dark/50 rounded-full transition-colors"
                  aria-label="Buscar"
                >
                  <Search size={20} />
                </button>
                <button
                  className="p-3 text-white hover:text-ufc-red hover:bg-ufc-dark/50 rounded-full transition-colors"
                  aria-label="Cuenta"
                >
                  <User size={20} />
                </button>
                <Link
                  href="https://welcome.ufcfightpass.com/region/latam"
                  target="_blank"
                  className="ml-2 px-6 py-3 bg-ufc-red hover:bg-red-700 text-white font-bold rounded-full shadow-lg shadow-red-900/30 hover:shadow-red-900/50 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  Suscribirse
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-white hover:text-ufc-red p-3 rounded-lg hover:bg-ufc-dark/50 transition-colors"
                  aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
                  aria-expanded={isOpen}
                >
                  {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === MOBILE MENU OVERLAY === */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 lg:hidden animate-fadeIn"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* === MOBILE MENU SIDEBAR === */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-ufc-dark to-ufc-black z-[60] transform transition-transform duration-400 ease-out lg:hidden shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación móvil"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-ufc-black/50">
          <span className="text-2xl font-black text-ufc-red italic">
            UFC<span className="text-white">PASIÓN</span>
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-ufc-red p-2 rounded-lg hover:bg-ufc-black/50 transition-colors"
            aria-label="Cerrar menú"
          >
            <X size={28} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col px-6 py-8 space-y-3" role="navigation">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => {
                setIsOpen(false);
                // 👇 Eliminamos setActiveLink
              }}
              className={`group flex items-center gap-4 py-4 px-5 rounded-xl font-semibold text-lg transition-all duration-200 ${isActive(link.href) // 👈 Usamos isActive aquí también
                  ? 'bg-ufc-red/20 text-ufc-red border-l-4 border-ufc-red'
                  : 'text-white hover:bg-ufc-black/50 hover:text-ufc-red border-l-4 border-transparent'
                }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="w-2 h-2 rounded-full bg-ufc-red/50 group-hover:bg-ufc-red transition-colors" />
              {link.label}
            </Link>
          ))}
          {/* Enlaces adicionales en móvil para visibilidad */}
          <Link
            href="https://www.ufcstore.com"
            target="_blank"
            className="text-white/70 hover:text-ufc-red py-2 px-5 text-sm uppercase tracking-widest transition-colors"
          >
            Tienda
          </Link>
          <Link
            href="https://www.ufcespanol.com/events"
            target="_blank"
            className="text-white/70 hover:text-ufc-red py-2 px-5 text-sm uppercase tracking-widest transition-colors"
          >
            Eventos
          </Link>
        </nav>

        {/* Mobile Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-ufc-black/50 space-y-4">
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-ufc-dark hover:bg-ufc-black text-white rounded-xl font-medium transition-colors">
              <Search size={18} /> Buscar
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-ufc-dark hover:bg-ufc-black text-white rounded-xl font-medium transition-colors">
              <User size={18} /> Cuenta
            </button>
          </div>
          <Link
            href="https://welcome.ufcfightpass.com/region/latam"
            target="_blank"
            onClick={() => setIsOpen(false)}
            className="block w-full py-4 bg-ufc-red hover:bg-red-700 text-white font-bold text-center rounded-xl shadow-lg shadow-red-900/30 transition-all active:scale-95"
          >
            Suscribirse Ahora
          </Link>
          <p className="text-ufc-gray text-xs text-center pt-2">
            © {new Date().getFullYear()} UFC Passion
          </p>
        </div>
      </div>
    </>
  );
}