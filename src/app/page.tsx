'use client';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Trophy, Calendar, Sword, Play, ChevronRight, 
  Flame, Shield, Users, LucideIcon, ArrowUp 
} from 'lucide-react';
import { useEffect, useCallback, useMemo, useRef } from 'react';

// =========================================
// TIPOS PARA TYPESCRIPT
// =========================================
type ColorKey = 'red' | 'gold' | 'white';

interface ColorClasses {
  border: string;
  icon: string;
  hover: string;
  text: string;
  bg: string;
  hoverBg: string;
  cornerBorder: string;
}

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: ColorKey;
  href: string;
}

interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
}

interface Stat {
  value: string;
  label: string;
  icon: LucideIcon;
}

interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  featured: boolean;
}

// =========================================
// DATOS ESTÁTICOS (fuera del componente)
// =========================================
const timelineEvents: TimelineEvent[] = [
  { year: '1993', title: 'El Inicio', desc: 'UFC nace en Denver como torneo sin reglas ni límites de peso.' },
  { year: '2001', title: 'La Transformación', desc: 'Fertitta y Dana White adquieren el UFC por $2M.' },
  { year: '2005', title: 'El Punto de Inflexión', desc: 'Griffin vs Bonnar salva y populariza el UFC.' },
  { year: '2016', title: 'Era Global', desc: 'Venta a WME-IMG por $4 mil millones de dólares.' },
  { year: 'Hoy', title: 'Líder Mundial', desc: 'Presencia en 170+ países, eventos en estadios llenos.' }
];

const stats: Stat[] = [
  { value: '1993', label: 'Fundación', icon: Flame },
  { value: '600+', label: 'Eventos', icon: Calendar },
  { value: '12', label: 'Categorías', icon: Trophy },
  { value: '170+', label: 'Países', icon: Users }
];

const gallery: GalleryItem[] = [
  {
    src: 'https://trome.com/resizer/v2/NVJYTMTWQBEKVCDTYQSOJ5CMYQ.jpg?auth=a6b4f27843a18bb78883f060ca14012210e7efc720e6fa1f2c2667ba6c485f6d&width=980&quality=90&smart=true',
    alt: 'Octágono actual', title: 'El Octágono', subtitle: 'Hoy', featured: true
  },
  {
    src: 'https://i.ytimg.com/vi/PO0WoldlGN8/maxresdefault.jpg',
    alt: 'Royce Gracie - UFC 1', title: 'UFC 1', subtitle: '1993', featured: false
  },
  {
    src: 'https://www.fightsports.tv/wp-content/uploads/Photo-by-Josh-HedgesZuffa-LLCZuffa-LLC.jpg',
    alt: 'Forrest Griffin vs Stephan Bonnar', title: 'Griffin vs Bonnar', subtitle: '2005', featured: false
  },
  {
    src: 'https://st1.uvnimg.com/1f/e8/8f495f6f4877aa1c87260064217d/ap-20019200153841.jpg',
    alt: 'Conor McGregor', title: 'Conor McGregor', subtitle: 'Lightweight', featured: false
  },
  {
    src: 'https://static.foxdeportes.com/2021/04/USATSI_13012735.jpg',
    alt: 'Amanda Nunes', title: 'Amanda Nunes', subtitle: 'Bantamweight', featured: false
  }
];

const features: Feature[] = [
  {
    icon: Sword,
    title: 'Técnicas Puras',
    desc: 'Boxeo, Jiu-Jitsu, Muay Thai y Lucha se fusionan en el arte marcial más completo.',
    color: 'red',
    href: '/disciplines'
  },
  {
    icon: Trophy,
    title: 'Campeones Mundiales',
    desc: 'Los atletas más élite compiten por el cinturón más prestigioso del MMA.',
    color: 'gold',
    href: '/fighters'
  },
  {
    icon: Calendar,
    title: 'Eventos PPV',
    desc: 'Carteleras épicas transmitidas en vivo desde arenas icónicas del mundo.',
    color: 'white',
    href: 'https://www.ufcespanol.com/events'
  }
];

const colorClasses: Record<ColorKey, ColorClasses> = {
  red: {
    border: 'border-ufc-red/30',
    icon: 'text-ufc-red',
    hover: 'hover:border-ufc-red',
    text: 'text-ufc-red',
    bg: 'bg-ufc-red/10',
    hoverBg: 'group-hover:bg-ufc-red',
    cornerBorder: 'border-ufc-red/30'
  },
  gold: {
    border: 'border-ufc-gold/30',
    icon: 'text-ufc-gold',
    hover: 'hover:border-ufc-gold',
    text: 'text-ufc-gold',
    bg: 'bg-ufc-gold/10',
    hoverBg: 'group-hover:bg-ufc-gold',
    cornerBorder: 'border-ufc-gold/30'
  },
  white: {
    border: 'border-white/30',
    icon: 'text-white',
    hover: 'hover:border-white',
    text: 'text-white',
    bg: 'bg-white/10',
    hoverBg: 'group-hover:bg-white',
    cornerBorder: 'border-white/30'
  }
};

// =========================================
// COMPONENTE PRINCIPAL
// =========================================
export default function Home() {
  // Referencia para el frame de animación del scroll
  const ticking = useRef(false);

  // Efecto para el botón "volver arriba" con throttling
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const btn = document.getElementById('backToTop');
        if (btn) {
          const isVisible = window.scrollY > 400;
          btn.setAttribute('data-visible', String(isVisible));
        }
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <main className="bg-ufc-black min-h-screen text-white overflow-x-hidden">

      {/* HERO SECTION - con video de YouTube */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden animate-fadeIn">
        {/* Video Background Container */}
        <div className="absolute inset-0 w-full h-full z-0">
          {/* Capas de Overlay (Gradientes) */}
          <div className="absolute inset-0 bg-ufc-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-ufc-black via-ufc-black/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-ufc-black/60 via-transparent to-ufc-black/60 z-10" />

          {/* El iFrame con técnica de rellenado (Aspect Ratio Hack) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <iframe
              className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2"
              src="https://www.youtube.com/embed/Y50toV8iOiE?autoplay=1&mute=1&loop=1&playlist=Y50toV8iOiE&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&enablejsapi=1"
              title="UFC Video Background"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              loading="lazy"
            />
          </div>
        </div>

        {/* Contenido Hero */}
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-ufc-red/20 border border-ufc-red/40 rounded-full mb-6">
            <Flame className="w-4 h-4 text-ufc-red" />
            <span className="text-sm font-semibold text-ufc-red uppercase tracking-wider">Temporada 2024</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black italic text-white mb-6 leading-tight drop-shadow-2xl">
            SOMOS <span className="pr-4 text-transparent bg-clip-text bg-gradient-to-r from-ufc-red to-red-600">LEGENDARIOS</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-ufc-gray/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Explora el universo de las artes marciales mixtas. Historia, leyendas y los próximos eventos que definirán el futuro del combate.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/fighters"
              className="group relative px-8 py-4 bg-ufc-red hover:bg-red-700 text-white font-bold text-lg rounded-none skew-x-[-12deg] transition-all duration-300 hover:shadow-xl hover:shadow-red-900/40 overflow-hidden"
            >
              <span className="skew-x-[12deg] inline-flex items-center gap-2">
                VER LUCHADORES
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="https://www.ufcespanol.com/events"
              className="group px-8 py-4 border-2 border-white/30 hover:border-ufc-red text-white font-semibold text-lg rounded-none skew-x-[-12deg] transition-all duration-300 hover:bg-ufc-red/10"
            >
              <span className="skew-x-[12deg] inline-flex items-center gap-2">
                <Play className="w-4 h-4 fill-current" />
                PRÓXIMOS EVENTOS
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* === HISTORIA SECTION === */}
      <section className="py-24 px-4 relative animate-fadeIn">
        <div className="absolute inset-0 bg-gradient-to-b from-ufc-black via-ufc-dark/30 to-ufc-black pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-ufc-red font-bold text-sm tracking-[0.2em] uppercase mb-3">
              Nuestra Historia
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
              La Leyenda del <span className="text-transparent bg-clip-text bg-gradient-to-r from-ufc-gold to-yellow-600">Octágono</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-ufc-red via-ufc-gold to-ufc-red mx-auto mt-6 rounded-full" />
            <p className="text-ufc-gray text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
              Desde un torneo experimental hasta el fenómeno deportivo global que define el combate moderno.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Columna izquierda: Timeline + Stats + Quote */}
            <div className="space-y-6">
              {timelineEvents.map((event) => (
                <div
                  key={event.year}
                  className="group relative pl-8 pb-6 border-l-2 border-ufc-dark hover:border-ufc-red/50 transition-colors cursor-default"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-ufc-black border-2 border-ufc-red group-hover:bg-ufc-red group-hover:scale-125 transition-all duration-300" />

                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-2xl font-black text-ufc-gold">{event.year}</span>
                    <span className="text-lg font-bold text-white group-hover:text-ufc-red transition-colors">{event.title}</span>
                  </div>
                  <p className="text-ufc-gray/90 leading-relaxed pl-1">{event.desc}</p>
                </div>
              ))}

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="group stat-card hover:border-ufc-gold/50"
                    >
                      <Icon className="stat-icon group-hover:scale-110" />
                      <div className="stat-value group-hover:text-ufc-gold">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Quote */}
              <blockquote className="mt-8 p-6 border-l-4 border-ufc-red bg-gradient-to-r from-ufc-red/10 to-transparent rounded-r-lg italic">
                <p className="text-white text-lg font-medium leading-relaxed">
                  "El UFC no es solo un deporte, es un estilo de vida. Representa la lucha, la disciplina y el honor."
                </p>
                <footer className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-full bg-ufc-dark border border-ufc-gold flex items-center justify-center">
                    <span className="text-ufc-gold font-bold text-sm">DW</span>
                  </div>
                  <div>
                    <p className="text-ufc-gold font-semibold">Dana White</p>
                    <p className="text-ufc-gray text-xs uppercase tracking-wide">Presidente del UFC</p>
                  </div>
                </footer>
              </blockquote>
            </div>

            {/* Columna derecha: Gallery */}
            <div className="grid grid-cols-2 gap-4">
              {gallery.map((item, index) => (
                <div
                  key={item.title}
                  className={`group relative rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-[1.02] ${
                    item.featured ? 'col-span-2 h-64 md:h-72' : 'h-40 md:h-44'
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes={item.featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                    priority={index === 0}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />

                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    item.featured ? 'from-black/90' : 'from-black/80'
                  } to-transparent`} />

                  {item.featured && (
                    <div className="absolute top-4 right-4 bg-ufc-red text-white text-xs font-bold px-3 py-1 rounded-full">
                      Actualidad
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white font-bold text-base md:text-lg leading-tight">{item.title}</p>
                    <p className="text-ufc-gold text-xs md:text-sm font-semibold uppercase tracking-wide mt-1">{item.subtitle}</p>
                  </div>

                  <div className="absolute inset-0 bg-ufc-red/0 group-hover:bg-ufc-red/10 transition-colors duration-300 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === FEATURES SECTION === */}
      <section className="py-24 px-4 relative overflow-hidden animate-fadeIn">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-ufc-red/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-ufc-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2 text-ufc-red font-bold text-sm tracking-[0.2em] uppercase mb-3">
              <Shield className="w-4 h-4" />
              ¿Por qué UFC?
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
              EL <span className="text-transparent bg-clip-text bg-gradient-to-r from-ufc-red to-red-600">ESPÍRITU</span> DEL COMBATE
            </h2>
            <div className="w-28 h-1 bg-gradient-to-r from-ufc-red to-ufc-gold mx-auto mt-5 rounded-full" />
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature) => {
              const colors = colorClasses[feature.color];
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group relative hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className={`card-pro ${colors.hover}`}>
                    <div className={`card-icon ${colors.bg} ${colors.border}`}>
                      <Icon className={`${colors.icon} w-7 h-7`} />
                      <div className={`absolute inset-0 ${colors.icon} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />
                    </div>

                    <h3 className={`text-xl font-bold text-white mb-3 ${colors.text} group-hover:${colors.text} transition-colors`}>
                      {feature.title}
                    </h3>
                    <p className="text-ufc-gray/90 text-sm leading-relaxed mb-6 min-h-[72px]">
                      {feature.desc}
                    </p>

                    <div className={`w-14 h-0.5 ${colors.bg} ${colors.hoverBg} transition-all duration-500 rounded-full`} />

                    <Link
                      href={feature.href}
                      className={`absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 ${colors.text}`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>

                  <div className={`absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 ${colors.cornerBorder} rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* === BACK TO TOP BUTTON === */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-50 p-3 bg-ufc-red hover:bg-red-700 text-white rounded-full shadow-lg shadow-red-900/40 transition-all duration-300 hover:scale-110 opacity-0 invisible data-[visible=true]:opacity-100 data-[visible=true]:visible"
        id="backToTop"
        aria-label="Volver arriba"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </main>
  );
}