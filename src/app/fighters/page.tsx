// app/fighters/page.tsx
'use client';

import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Award, Loader2, Star, Shield, ArrowUp } from 'lucide-react';
import Flags from 'react-world-flags';

// =========================================
// TIPOS
// =========================================
interface Fighter {
  id: number;
  name: string;
  nickname: string;
  record: string;
  weightClass: string;
  country: string;
  flag: string;
  champion: boolean;
  legend?: boolean;
  retiredAt?: string;
  era?: string;
  imageUrl: string;
  height?: string;
  reach?: string;
  age?: number;
}

// =========================================
// DATOS ESTÁTICOS (FUERA DEL COMPONENTE)
// =========================================
const fightersData: Fighter[] = [
  // ─── CAMPEONES ACTIVOS ───────────────────────────────────────────
  {
    id: 1,
    name: 'Jon Jones',
    nickname: 'Bones',
    record: '27-1-0 (1 NC)',
    weightClass: 'Peso Pesado',
    country: 'Estados Unidos',
    flag: 'USA',
    champion: true,
    imageUrl:
      'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-10/JONES_JON_L.png?itok=YzChKhrF',
    height: '1.93 m',
    reach: '2.15 m',
    age: 37,
  },
  {
    id: 2,
    name: 'Islam Makhachev',
    nickname: 'The Eagle',
    record: '26-1-0',
    weightClass: 'Peso Ligero',
    country: 'Rusia',
    flag: 'RUS',
    champion: true,
    imageUrl:
      'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-01/7/MAKHACHEV_ISLAM_L_BELT_01-18.png?itok=rmEnE1y2',
    height: '1.78 m',
    reach: '1.79 m',
    age: 33,
  },
  {
    id: 3,
    name: 'Alexandre Pantoja',
    nickname: 'The Cannibal',
    record: '27-5-0',
    weightClass: 'Peso Mosca',
    country: 'Brasil',
    flag: 'BRA',
    champion: true,
    imageUrl:
      'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-12/PANTOJA_ALEXANDRE_L_07-08.png?itok=cpEeWowD',
    height: '1.65 m',
    reach: '1.73 m',
    age: 34,
  },
  {
    id: 4,
    name: 'Leon Edwards',
    nickname: 'Rocky',
    record: '22-4-0 (1 NC)',
    weightClass: 'Peso Welter',
    country: 'Inglaterra',
    flag: 'GBR',
    champion: false,
    imageUrl:
      'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-11/EDWARDS_LEON_L_11-15.png?itok=-8gaMhP0',
    height: '1.83 m',
    reach: '1.88 m',
    age: 33,
  },
  {
    id: 5,
    name: 'Israel Adesanya',
    nickname: 'The Last Stylebender',
    record: '24-3-0',
    weightClass: 'Peso Medio',
    country: 'Nigeria',
    flag: 'NGA',
    champion: false,
    imageUrl:
      'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-01/ADESANYA_ISRAEL_L_02-01.png?itok=oLGG2Lmg',
    height: '1.93 m',
    reach: '2.03 m',
    age: 35,
  },
  {
    id: 6,
    name: 'Alexander Volkanovski',
    nickname: 'The Great',
    record: '26-3-0',
    weightClass: 'Peso Pluma',
    country: 'Australia',
    flag: 'AUS',
    champion: false,
    imageUrl:
      'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2026-01/VOLKANOVSKI_ALEXANDER_L_BELT_01-31.png?itok=03AEGqgT',
    height: '1.68 m',
    reach: '1.82 m',
    age: 36,
  },
  {
    id: 7,
    name: "Sean O'Malley",
    nickname: 'Suga',
    record: '17-2-0 (1 NC)',
    weightClass: 'Peso Gallo',
    country: 'Estados Unidos',
    flag: 'USA',
    champion: false,
    imageUrl:
      'https://a.espncdn.com/combiner/i?img=/i/headshots/mma/players/full/4205093.png&w=350&h=254',
    height: '1.80 m',
    reach: '1.83 m',
    age: 30,
  },
  {
    id: 8,
    name: 'Zhang Weili',
    nickname: 'Magnum',
    record: '24-3-0',
    weightClass: 'Peso Paja',
    country: 'China',
    flag: 'CHN',
    champion: true,
    imageUrl:
      'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2022-06/d6bd47bc-d423-4ae8-9073-f0abd7777751%252FWEILI_ZHANG_L_06-11.png?itok=RNACun7r',
    height: '1.63 m',
    reach: '1.60 m',
    age: 35,
  },
  {
    id: 9,
    name: 'Alex Pereira',
    nickname: 'Poatan',
    record: '12-2-0',
    weightClass: 'Peso Semipesado',
    country: 'Brasil',
    flag: 'BRA',
    champion: true,
    imageUrl:
      'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-03/PEREIRA_ALEX_L_BELT_03-08.png?itok=VjmnG4ZQ',
    height: '1.94 m',
    reach: '2.00 m',
    age: 37,
  },
  {
    id: 10,
    name: 'Ilia Topuria',
    nickname: 'El Matador',
    record: '15-0-0',
    weightClass: 'Peso Pluma',
    country: 'España',
    flag: 'ESP',
    champion: true,
    imageUrl:
      'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2024-10/TOPURIA_ILIA_L_BELT_10-26.png?itok=dzzDUXEu',
    height: '1.70 m',
    reach: '1.75 m',
    age: 28,
  },
  {
    id: 11,
    name: 'Dricus du Plessis',
    nickname: 'Stillknocks',
    record: '21-2-0',
    weightClass: 'Peso Medio',
    country: 'Sudáfrica',
    flag: 'ZAF',
    champion: true,
    imageUrl:
      'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-08/DU_PLESSIS_DRICUS_L_01-20.png?itok=qi60J25b',
    height: '1.85 m',
    reach: '1.93 m',
    age: 31,
  },
  {
    id: 12,
    name: 'Merab Dvalishvili',
    nickname: 'The Machine',
    record: '17-4-0',
    weightClass: 'Peso Gallo',
    country: 'Georgia',
    flag: 'GEO',
    champion: false,
    imageUrl:
      'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2022-08/DVALISHVILI_MERAB_L_08-20.png?itok=9Aqfr1In',
    height: '1.68 m',
    reach: '1.73 m',
    age: 34,
  },
  // --- NUEVOS: Dustin Poirier y Charles Oliveira (activos, excampeones) ---
  {
    id: 19,
    name: 'Dustin Poirier',
    nickname: 'The Diamond',
    record: '30-8-0 (1 NC)',
    weightClass: 'Peso Ligero',
    country: 'Estados Unidos',
    flag: 'USA',
    champion: false,
    imageUrl:
      'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-01/5/POIRIER_DUSTIN_L_06-01.png?itok=L4Jvzl-6',
    height: '1.75 m',
    reach: '1.83 m',
    age: 35,
  },
  {
    id: 20,
    name: 'Charles Oliveira',
    nickname: 'Do Bronx',
    record: '34-10-0 (1 NC)',
    weightClass: 'Peso Ligero',
    country: 'Brasil',
    flag: 'BRA',
    champion: false,
    imageUrl:
      'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-10/OLIVEIRA_CHARLES_L_10-11.png?itok=A20hEXoe',
    height: '1.78 m',
    reach: '1.88 m',
    age: 35,
  },
  // ─── LEYENDAS ────────────────────────────────────────────────────
  {
    id: 13,
    name: 'Khabib Nurmagomedov',
    nickname: 'The Eagle',
    record: '29-0-0',
    weightClass: 'Peso Ligero',
    country: 'Rusia',
    flag: 'RUS',
    champion: true,
    legend: true,
    retiredAt: 'Peso Ligero',
    era: 'Retirado invicto · 2021',
    imageUrl:
      'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/image/fighter_images/Khabib_Nurmagomedov/1NURMAGOMEDOV_KHABIB_L.png?itok=wy8QdF9L',
    height: '1.78 m',
    reach: '1.78 m',
    age: 36,
  },
  {
    id: 14,
    name: 'Georges St-Pierre',
    nickname: 'GSP',
    record: '26-2-0',
    weightClass: 'Peso Welter',
    country: 'Canadá',
    flag: 'CAN',
    champion: true,
    legend: true,
    retiredAt: 'Peso Welter / Peso Medio',
    era: 'Retirado · 2019',
    imageUrl:
      'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/image/ufc-fighter-container/68009/profile-galery/fullbodyleft-picture/Georges-St-Pierre_318_LeftFullBodyImage.png?itok=YRZwQSl-',
    height: '1.78 m',
    reach: '1.93 m',
    age: 43,
  },
  {
    id: 15,
    name: 'Anderson Silva',
    nickname: 'The Spider',
    record: '34-11-0 (1 NC)',
    weightClass: 'Peso Medio',
    country: 'Brasil',
    flag: 'BRA',
    champion: true,
    legend: true,
    retiredAt: 'Peso Medio',
    era: 'Retirado · 2023',
    imageUrl:
      'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/image/fighter_images/Anderson_Silva/SILVA_ANDERSON_L.png?itok=vR9mL2nK',
    height: '1.88 m',
    reach: '1.97 m',
    age: 49,
  },
  {
    id: 16,
    name: 'Chuck Liddell',
    nickname: 'The Iceman',
    record: '21-9-0',
    weightClass: 'Peso Semipesado',
    country: 'Estados Unidos',
    flag: 'USA',
    champion: true,
    legend: true,
    retiredAt: 'Peso Semipesado',
    era: 'Retirado · 2010',
    imageUrl:
      'https://www.ufcespanol.com/images/styles/inline/s3/image/fighter_images/Chuck_Liddell/Chuck_Lidell_500x325.png?VersionId=nFu.E0MD5n832a44osIYA0FFsEy2rdRT&itok=_DmLKIMR',
    height: '1.88 m',
    reach: '1.93 m',
    age: 54,
  },
  {
    id: 17,
    name: 'Conor McGregor',
    nickname: 'The Notorious',
    record: '22-6-0',
    weightClass: 'Peso Pluma / Peso Ligero',
    country: 'Irlanda',
    flag: 'IRL',
    champion: true,
    legend: true,
    retiredAt: 'Peso Ligero',
    era: 'Inactivo desde · 2021',
    imageUrl:
      'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2021-07/MCGREGOR_CONOR_L_07-10.png?itok=GGdEvNOI',
    height: '1.75 m',
    reach: '1.88 m',
    age: 36,
  },
  {
    id: 18,
    name: 'Ronda Rousey',
    nickname: 'Rowdy',
    record: '12-2-0',
    weightClass: 'Peso Gallo Fem.',
    country: 'Estados Unidos',
    flag: 'USA',
    champion: true,
    legend: true,
    retiredAt: 'Peso Gallo Femenino',
    era: 'Retirada · 2016',
    imageUrl:
      'https://a.espncdn.com/combiner/i?img=/i/headshots/mma/players/full/2563796.png&w=350&h=254',
    height: '1.70 m',
    reach: '1.69 m',
    age: 38,
  },
];

// =========================================
// FUNCIÓN AUXILIAR PARA CÓDIGO DE PAÍS
// =========================================
const getCountryCode = (country: string): string => {
  const codes: Record<string, string> = {
    'Estados Unidos': 'USA',
    Rusia: 'RUS',
    Brasil: 'BRA',
    Inglaterra: 'GBR',
    Nigeria: 'NGA',
    Australia: 'AUS',
    China: 'CHN',
    España: 'ESP',
    Sudáfrica: 'ZAF',
    Georgia: 'GEO',
    Canadá: 'CAN',
    Irlanda: 'IRL',
  };
  return codes[country] || 'USA';
};

// =========================================
// CATEGORÍAS ÚNICAS (MEMOIZADAS)
// =========================================
const CATEGORIES = [
  'Todos',
  'Activos',
  'Leyendas',
  ...Array.from(new Set(fightersData.map((f) => f.weightClass))),
];

// Cantidad de elementos a cargar por lote
const ITEMS_PER_BATCH = 8;

// =========================================
// COMPONENTE PRINCIPAL
// =========================================
export default function FightersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_BATCH);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Referencias para Intersection Observer
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);
  const ticking = useRef(false);

  // Filtrar luchadores según búsqueda y categoría
  const filtered = useMemo(() => {
    return fightersData.filter((fighter) => {
      const matchesSearch =
        fighter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fighter.nickname.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesFilter = true;
      if (selectedFilter === 'Leyendas') matchesFilter = !!fighter.legend;
      else if (selectedFilter === 'Activos') matchesFilter = !fighter.legend;
      else if (selectedFilter !== 'Todos') matchesFilter = fighter.weightClass === selectedFilter;

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, selectedFilter]);

  // Reiniciar contador cuando cambian los filtros
  useEffect(() => {
    setDisplayCount(ITEMS_PER_BATCH);
  }, [searchTerm, selectedFilter]);

  // Elementos visibles actualmente
  const displayed = useMemo(() => filtered.slice(0, displayCount), [filtered, displayCount]);

  const hasMore = displayCount < filtered.length;

  // Callback para imágenes cargadas
  const handleImageLoad = useCallback((id: number) => {
    setImagesLoaded((prev) => ({ ...prev, [id]: true }));
  }, []);

  // Configurar Intersection Observer para scroll infinito
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore) {
          setDisplayCount((prev) => prev + ITEMS_PER_BATCH);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    const currentElement = lastElementRef.current;
    if (currentElement && hasMore) {
      observerRef.current.observe(currentElement);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [hasMore, displayed.length]);

  // Control de visibilidad del botón "volver arriba"
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        setShowScrollButton(window.scrollY > 400);
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
    <div className="bg-ufc-black min-h-screen pt-20 pb-16 animate-fadeIn">
      {/* Hero */}
<section className="relative pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-20 px-4 border-b bg-gradient-to-b from-ufc-dark to-ufc-black border-ufc-gold/30">
  <div className="max-w-6xl mx-auto text-center">
    <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white uppercase tracking-tight">
      Luchadores <span className="text-ufc-red">Élite</span>
    </h1>

    <p className="text-base sm:text-lg md:text-xl text-ufc-gray/90 mt-4 sm:mt-6 max-w-3xl mx-auto leading-relaxed">
      Campeones actuales y leyendas que definieron la historia del octágono.
    </p>

    <div className="flex flex-wrap justify-center gap-12 mt-8 sm:mt-10">
      <div className="text-center">
        <div className="text-2xl sm:text-3xl font-black text-ufc-gold">
          {fightersData.filter((f) => f.champion && !f.legend).length}
        </div>
        <div className="text-xs uppercase tracking-widest text-ufc-gray mt-1">
          Campeones
        </div>
      </div>
      <div className="text-center">
        <div className="text-2xl sm:text-3xl font-black text-ufc-gold">
          {fightersData.filter((f) => f.legend).length}
        </div>
        <div className="text-xs uppercase tracking-widest text-ufc-gray mt-1">
          Leyendas
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Filtros */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Buscador */}
          <div className="relative w-full md:w-80 flex-shrink-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ufc-gray w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar luchador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-ufc-dark border border-ufc-gray/30 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-ufc-gray/50 focus:outline-none focus:border-ufc-red transition"
            />
          </div>

          {/* Filtros tipo píldora */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isLegend = cat === 'Leyendas';
              const isActive = selectedFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? isLegend
                        ? 'bg-ufc-gold text-ufc-black shadow-lg shadow-ufc-gold/30'
                        : 'bg-ufc-red text-white'
                      : isLegend
                      ? 'bg-ufc-gold/10 text-ufc-gold border border-ufc-gold/30 hover:bg-ufc-gold/20'
                      : 'bg-ufc-dark text-ufc-gray hover:bg-ufc-red/20 hover:text-white border border-transparent'
                  }`}
                >
                  {isLegend && <Star size={12} />}
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 text-sm text-ufc-gray">
          {filtered.length} {filtered.length === 1 ? 'luchador encontrado' : 'luchadores encontrados'}
        </div>
      </section>

      {/* Grid de luchadores */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-ufc-gray text-xl mb-2">No se encontraron luchadores</p>
            <p className="text-ufc-gray/60">Intenta con otros términos de búsqueda</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayed.map((fighter, index) => {
                const isLegend = !!fighter.legend;
                const countryCode = getCountryCode(fighter.country);

                return (
                  <Link
                    key={fighter.id}
                    href={`/fighters/${fighter.id}`}
                    className={`group relative rounded-xl overflow-hidden border transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl animate-fadeIn ${
                      isLegend
                        ? 'border-ufc-gold/50 hover:border-ufc-gold hover:shadow-ufc-gold/20 bg-gradient-to-b from-[#1a1500] via-ufc-dark to-ufc-black'
                        : 'border-ufc-gray/20 hover:border-ufc-red hover:shadow-ufc-red/20 bg-gradient-to-b from-ufc-dark to-ufc-black'
                    }`}
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    {/* Borde superior para leyendas */}
                    {isLegend && (
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-ufc-gold to-transparent z-20" />
                    )}

                    {/* Imagen */}
                    <div className="relative h-64 w-full overflow-hidden bg-ufc-black">
                      {!imagesLoaded[fighter.id] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-ufc-dark">
                          <Loader2 className="w-8 h-8 text-ufc-gray animate-spin" />
                        </div>
                      )}
                      <Image
                        src={fighter.imageUrl}
                        alt={fighter.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className={`object-cover object-top transition-transform duration-500 group-hover:scale-110 ${
                          imagesLoaded[fighter.id] ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => handleImageLoad(fighter.id)}
                        priority={index < 4}
                        loading={index < 4 ? 'eager' : 'lazy'}
                      />

                      {/* Overlay leyenda */}
                      {isLegend && (
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1500]/80 via-transparent to-transparent" />
                      )}

                      {/* Badge campeón */}
                      {fighter.champion && (
                        <div
                          className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 z-10 ${
                            isLegend
                              ? 'bg-ufc-gold text-ufc-black shadow-lg shadow-ufc-gold/40'
                              : 'bg-ufc-gold text-ufc-black'
                          }`}
                        >
                          <Award size={12} />
                          <span>{isLegend ? 'Ex-C' : 'C'}</span>
                        </div>
                      )}

                      {/* Badge leyenda */}
                      {isLegend && (
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-ufc-gold/90 to-yellow-600/90 text-ufc-black text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1 z-10 shadow-md">
                          <Star size={10} fill="currentColor" />
                          LEYENDA
                        </div>
                      )}
                    </div>

                    {/* Información */}
                    <div className={`p-4 ${isLegend ? 'border-t border-ufc-gold/20' : ''}`}>
                      <h3
                        className={`font-bold text-lg leading-tight ${
                          isLegend ? 'text-ufc-gold' : 'text-white'
                        }`}
                      >
                        {fighter.name}
                      </h3>
                      <p className="text-ufc-gray text-sm italic">"{fighter.nickname}"</p>

                      <div className="flex items-center gap-2 mt-2 text-sm">
                        <span
                          className={`font-semibold ${
                            isLegend ? 'text-yellow-400' : 'text-ufc-gold'
                          }`}
                        >
                          {fighter.record}
                        </span>
                        <span className="text-ufc-gray">•</span>
                        <span className="flex items-center gap-1.5">
                          <Flags
                            code={countryCode}
                            style={{ width: 18, height: 14 }}
                            className="rounded-sm shadow-sm"
                          />
                          <span className="text-xs text-ufc-gray uppercase font-medium">
                            {countryCode}
                          </span>
                        </span>
                      </div>

                      {/* Era / retiro para leyendas */}
                      {isLegend && fighter.era && (
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-ufc-gold/70 font-medium">
                          <Shield size={11} />
                          {fighter.era}
                        </div>
                      )}

                      {/* Stats hover */}
                      <div className="mt-2 text-xs text-ufc-gray/70 grid grid-cols-2 gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {fighter.height && <span>Altura: {fighter.height}</span>}
                        {fighter.reach && <span>Alcance: {fighter.reach}</span>}
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            isLegend
                              ? 'bg-ufc-gold/15 text-ufc-gold border border-ufc-gold/30'
                              : 'bg-ufc-red/20 text-ufc-red'
                          }`}
                        >
                          {fighter.retiredAt ?? fighter.weightClass}
                        </span>
                        <span
                          className={`text-sm font-medium transition-colors ${
                            isLegend
                              ? 'text-ufc-gray group-hover:text-ufc-gold'
                              : 'text-ufc-gray group-hover:text-ufc-gold'
                          }`}
                        >
                          Ver perfil →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Elemento centinela para scroll infinito */}
            {hasMore && (
              <div ref={lastElementRef} className="h-10 w-full flex items-center justify-center mt-8">
                <Loader2 className="w-6 h-6 text-ufc-gold animate-spin" />
                <span className="ml-2 text-ufc-gold text-sm">Cargando más luchadores...</span>
              </div>
            )}

            {/* Mensaje final */}
            {!hasMore && displayed.length > 0 && (
              <div className="text-center mt-12 text-ufc-gray/60 text-sm">
                — Has visto todos los luchadores —
              </div>
            )}
          </>
        )}
      </section>

      {/* Botón "Volver arriba" */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-50 p-3 bg-ufc-red hover:bg-red-700 text-white rounded-full shadow-lg shadow-red-900/40 transition-all duration-300 hover:scale-110 ${
          showScrollButton ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-label="Volver arriba"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}