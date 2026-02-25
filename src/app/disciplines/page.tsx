// app/disciplines/page.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback, useRef } from 'react';
import Flags from 'react-world-flags';
import {
  Award,
  Target,
  Flame,
  ChevronRight,
  Play,
  Star,
  TrendingUp,
  Shield,
  Zap,
  Clock,
  ArrowUp,
} from 'lucide-react';

// ─── MAPEO DE PAÍSES A CÓDIGOS ISO ────────────────────────────────
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
    'Nueva Zelanda': 'NZL',
  };
  return codes[country] || 'USA';
};

// ─── SVG ICONS POR DISCIPLINA ─────────────────────────────────────
const DisciplineIcons: Record<string, JSX.Element> = {
  boxeo: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <path d="M12 28c0-8.837 7.163-16 16-16h8c4.418 0 8 3.582 8 8v4H12v-4z" fill="#D20A0A" opacity="0.8" />
      <rect x="10" y="30" width="34" height="18" rx="4" fill="#D20A0A" />
      <path d="M44 34h4a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-4V34z" fill="#991B1B" />
      <rect x="10" y="30" width="34" height="4" rx="2" fill="#7F1D1D" />
      <path d="M18 34h2v14h-2zM24 34h2v14h-2z" fill="#991B1B" opacity="0.4" />
    </svg>
  ),
  bjj: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <circle cx="32" cy="14" r="8" fill="#C5A059" />
      <path d="M16 32c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="#C5A059" strokeWidth="3" fill="none" />
      <path d="M8 40c4-12 12-14 24-8 12-6 20-4 24 8" fill="#C5A059" opacity="0.7" />
      <path d="M14 42c2-6 8-8 18-4 10-4 16-2 18 4" fill="#92400E" opacity="0.8" />
      <circle cx="20" cy="50" r="5" fill="#C5A059" />
      <circle cx="44" cy="50" r="5" fill="#C5A059" />
      <path d="M25 50 q7-6 14 0" stroke="#C5A059" strokeWidth="2" fill="none" />
    </svg>
  ),
  wrestling: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <circle cx="22" cy="12" r="6" fill="#D20A0A" />
      <circle cx="42" cy="12" r="6" fill="#D20A0A" />
      <path d="M10 28c0-6.627 5.373-12 12-12h20c6.627 0 12 5.373 12 12v4H10v-4z" fill="#D20A0A" opacity="0.6" />
      <path d="M10 32h44v8c0 4.418-3.582 8-8 8H18c-4.418 0-8-3.582-8-8v-8z" fill="#991B1B" />
      <path d="M22 32v16M42 32v16M10 38h44" stroke="#7F1D1D" strokeWidth="2" />
    </svg>
  ),
  muaythai: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <circle cx="32" cy="10" r="7" fill="#EA580C" />
      <path d="M25 18h14v8l4 20H21l4-20z" fill="#EA580C" opacity="0.8" />
      <path d="M21 18l-6 10 4 4 6-8M43 18l6 10-4 4-6-8" fill="#C2410C" />
      <path d="M25 26l-4 20h22l-4-20" fill="#EA580C" />
      <path d="M18 46l-4 8h12l2-8M46 46l4 8H38l-2-8" fill="#C2410C" />
    </svg>
  ),
  judo: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <circle cx="44" cy="10" r="6" fill="#6366F1" />
      <path d="M48 16c6 4 8 12 4 20l-16 6" stroke="#6366F1" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="20" cy="34" r="6" fill="#6366F1" opacity="0.7" />
      <path d="M20 40c-6 2-10 8-8 14h28c4-8-2-16-12-16z" fill="#6366F1" opacity="0.6" />
      <path d="M36 36l-16-20" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" />
      <path d="M28 18l12 4-6 10" fill="#4F46E5" opacity="0.8" />
    </svg>
  ),
  sambo: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect x="8" y="8" width="20" height="14" rx="2" fill="#D20A0A" />
      <rect x="36" y="8" width="20" height="14" rx="2" fill="#1E3A8A" />
      <rect x="20" y="8" width="24" height="14" rx="0" fill="#F8FAFC" />
      <circle cx="32" cy="34" r="14" fill="none" stroke="#D20A0A" strokeWidth="2.5" />
      <path d="M26 34l4 4 8-8" stroke="#D20A0A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 48c0-7.732 6.268-14 14-14s14 6.268 14 14" fill="#1E293B" stroke="#D20A0A" strokeWidth="1.5" />
    </svg>
  ),
  karate: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <circle cx="32" cy="10" r="6" fill="#9333EA" />
      <path d="M26 16h12v12l6 24H20l6-24z" fill="#9333EA" opacity="0.7" />
      <path d="M32 28l-14 8 2 4 12-6M32 28l14 8-2 4-12-6" fill="#7C3AED" />
      <path d="M26 16 L10 24 L14 30 L26 24" fill="#6D28D9" opacity="0.8" />
      <path d="M38 16 L54 24 L50 30 L38 24" fill="#6D28D9" opacity="0.8" />
    </svg>
  ),
  taekwondo: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <circle cx="20" cy="10" r="6" fill="#0F172A" />
      <path d="M16 16h8v14l-8 22H8l8-22z" fill="#1E293B" />
      <path d="M24 20l20-8 4 6-20 10" fill="#0F172A" opacity="0.8" />
      <path d="M24 30l22 4-2 6-20-4" fill="#0F172A" />
      <path d="M14 52l24-16 4 6-24 14" fill="#334155" />
      <circle cx="46" cy="56" r="4" fill="#0F172A" opacity="0.6" />
    </svg>
  ),
};

// ─── DATOS COMPLETOS DE LAS 8 DISCIPLINAS ──────────────────────────
const disciplines = [
  {
    id: 'boxeo',
    name: 'Boxeo',
    subtitle: 'El Arte de los Puños',
    origin: 'Grecia Antigua / Moderno: Reino Unido, s. XVIII',
    color: 'from-ufc-red to-red-900',
    accentColor: '#D20A0A',
    bgGlow: 'rgba(210,10,10,0.08)',
    videoId: 'eeo2qoDALTE',
    description: 'El boxeo es el arte marcial de los puños. En el octágono, representa la base del striking moderno: economía de movimiento, lectura de distancias y la búsqueda del nocaut preciso.',
    history: 'Con raíces en la Grecia clásica, el boxeo moderno se codificó en Inglaterra en el siglo XVIII. En UFC es la disciplina de pie más estudiada por su efectividad.',
    stats: { poder: 95, velocidad: 88, resistencia: 80, kos: 72, defensa: 70 },
    techniques: [
      { name: 'Jab', desc: 'Golpe recto de mano guía. Establece distancia.' },
      { name: 'Cross', desc: 'Recto de mano dominante. Máximo poder.' },
      { name: 'Hook', desc: 'Golpe circular. Devastador al hígado o mandíbula.' },
      { name: 'Uppercut', desc: 'Golpe ascendente. Ideal en clinch.' },
      { name: 'Footwork', desc: 'Juego de piernas. Esencial para esquivar.' },
    ],
    topExponents: [5, 7, 17, 19],
    pros: ['Poder de nocaut', 'Velocidad de manos', 'Precisión y timing'],
    cons: ['Vulnerable a derribos', 'Limitado contra pateadores'],
    famousKOs: ['Pereira vs Adesanya I', "O'Malley vs Yan", 'McGregor vs Aldo (13 seg)'],
  },
  {
    id: 'bjj',
    name: 'Jiu-Jitsu Brasileño',
    subtitle: 'El Arte de la Sumisión',
    origin: 'Brasil, años 1920 (familia Gracie)',
    color: 'from-yellow-600 to-yellow-900',
    accentColor: '#C5A059',
    bgGlow: 'rgba(197,160,89,0.08)',
    videoId: 'Zw1nEKUC-mk',
    description: 'El BJJ es la ciencia del suelo. Desarrollado por la familia Gracie, demostró que con técnica un hombre de 70 kg puede someter a uno de 100 kg.',
    history: 'Mitsuyo Maeda llevó el Jiu-Jitsu japonés a Brasil, donde los Gracie lo refinaron. El primer UFC en 1993 fue diseñado para probar su efectividad.',
    stats: { poder: 60, velocidad: 65, resistencia: 85, kos: 30, defensa: 95 },
    techniques: [
      { name: 'Armbar', desc: 'Hiperextensión del codo. La sumisión más icónica.' },
      { name: 'Triangle', desc: 'Estrangulación con las piernas.' },
      { name: 'Rear-Naked Choke', desc: 'La más letal. Corta el flujo carotídeo.' },
      { name: 'Guard', desc: 'Posición defensiva y ofensiva.' },
      { name: 'Sweeps', desc: 'Reversales desde la guardia.' },
    ],
    topExponents: [3, 13, 15, 20],
    pros: ['Control absoluto en suelo', 'Submissions desde cualquier posición'],
    cons: ['Poco efectivo de pie', 'Vulnerable a ground and pound'],
    famousKOs: ['Khabib vs McGregor (RNC)', 'Pantoja vs Moreno (Sub)'],
  },
  {
    id: 'wrestling',
    name: 'Lucha Libre',
    subtitle: 'La Columna Vertebral del MMA',
    origin: 'Antigua Grecia / Moderna: EE.UU., Rusia',
    color: 'from-ufc-red to-blue-900',
    accentColor: '#D20A0A',
    bgGlow: 'rgba(210,10,10,0.08)',
    videoId: 'pAIdwSnLXW4',
    description: 'El wrestling es el arte del control total. Quien controla donde se pelea, controla el combate.',
    history: 'Sport olímpico desde la Antigua Grecia, el wrestling se reinventó en el siglo XX. En UFC, los ex-campeones de wrestling dominaron la primera década.',
    stats: { poder: 75, velocidad: 78, resistencia: 92, kos: 40, defensa: 90 },
    techniques: [
      { name: 'Double Leg', desc: 'Derribo de dos piernas. El más efectivo.' },
      { name: 'Single Leg', desc: 'Control de una pierna. Versátil.' },
      { name: 'Sprawl', desc: 'Defensa de derribo. Esencial.' },
      { name: 'Ground Control', desc: 'Dominio posicional en suelo.' },
      { name: 'Cage Control', desc: 'Usar la reja para controlar.' },
    ],
    topExponents: [1, 2, 14],
    pros: ['Dicta donde se pelea', 'Agotamiento del oponente'],
    cons: ['Menos efectivo en suelo profundo vs BJJ', 'Costoso en energía'],
    famousKOs: ['GSP vs Shields', 'Jones vs Gustafsson'],
  },
  {
    id: 'muaythai',
    name: 'Muay Thai',
    subtitle: 'El Arte de las Ocho Extremidades',
    origin: 'Tailandia, s. XIII',
    color: 'from-orange-600 to-orange-900',
    accentColor: '#EA580C',
    bgGlow: 'rgba(234,88,12,0.08)',
    videoId: '_uVwSnJSKh4',
    description: 'El Muay Thai usa puños, codos, rodillas y piernas. Su devastador clinch y patadas lo hacen el sistema de striking más completo.',
    history: 'Nacido como arte de guerra en Tailandia, pasó a ser deporte nacional. Alex Pereira es su máximo embajador en UFC.',
    stats: { poder: 92, velocidad: 85, resistencia: 83, kos: 80, defensa: 75 },
    techniques: [
      { name: 'Teep', desc: 'Patada de frente. Controla distancia.' },
      { name: 'Elbow', desc: 'Codo corto y devastador.' },
      { name: 'Knee', desc: 'Rodilla al cuerpo o cabeza.' },
      { name: 'Clinch', desc: 'El "plum" tailandés.' },
      { name: 'Low Kick', desc: 'Patada baja a la pierna.' },
    ],
    topExponents: [9, 4, 11],
    pros: ['8 armas de golpeo', 'Devastador en clinch'],
    cons: ['Sin base de lucha es vulnerable', 'Requiere alta condición'],
    famousKOs: ['Pereira vs Adesanya II', 'Edwards vs Usman II'],
  },
  {
    id: 'judo',
    name: 'Judo',
    subtitle: 'El Arte de los Lanzamientos',
    origin: 'Japón, 1882 (Jigoro Kano)',
    color: 'from-indigo-600 to-indigo-900',
    accentColor: '#6366F1',
    bgGlow: 'rgba(99,102,241,0.08)',
    videoId: 'jZa8-GS6QB4',
    description: 'El Judo transforma la fuerza del oponente en su propia debilidad. Sus proyecciones explosivas terminan combates al instante.',
    history: 'Creado por Jigoro Kano en 1882, es el primer arte marcial olímpico. Ronda Rousey demostró su dominio en UFC.',
    stats: { poder: 80, velocidad: 75, resistencia: 78, kos: 55, defensa: 72 },
    techniques: [
      { name: 'Harai Goshi', desc: 'Barrido de cadera. Potente.' },
      { name: 'Osoto Gari', desc: 'Zancadilla exterior.' },
      { name: 'Tomoe Nage', desc: 'Sacrificio hacia atrás.' },
      { name: 'Juji Gatame', desc: 'Armbar de suelo.' },
      { name: 'Newaza', desc: 'Trabajo en el suelo.' },
    ],
    topExponents: [8, 18],
    pros: ['Proyecciones devastadoras', 'Transición a sumisión'],
    cons: ['Arsenal limitado de striking', 'Menos sumisiones que BJJ'],
    famousKOs: ['Rousey vs Carmouche', 'Zhang vs Joanna'],
  },
  {
    id: 'sambo',
    name: 'Sambo',
    subtitle: 'El Sistema Ruso de Combate',
    origin: 'URSS, años 1920 (Vasili Oshchepkov)',
    color: 'from-ufc-red to-slate-900',
    accentColor: '#D20A0A',
    bgGlow: 'rgba(210,10,10,0.08)',
    videoId: '682TAttUtso',
    description: 'El Sambo fue diseñado para el ejército soviético integrando judo, lucha y técnicas de pierna. Khabib lo llevó a su máxima expresión.',
    history: 'Desarrollado en los años 20 por el ejército soviético. Dagestán produce los mejores practicantes del mundo.',
    stats: { poder: 82, velocidad: 80, resistencia: 90, kos: 50, defensa: 93 },
    techniques: [
      { name: 'Leg Locks', desc: 'Candados de pierna únicos.' },
      { name: 'Throws', desc: 'Proyecciones del judo.' },
      { name: 'Ground Control', desc: 'Dominio de posición total.' },
      { name: 'Scarf Hold', desc: 'Inmovilización lateral.' },
      { name: 'Knee Bars', desc: 'Hyperextensión de rodilla.' },
    ],
    topExponents: [2, 13],
    pros: ['Control total absoluto', 'Leg locks únicos'],
    cons: ['Menos striking que Muay Thai', 'Menos sumisiones puras'],
    famousKOs: ['Khabib vs McGregor', 'Islam vs Poirier'],
  },
  {
    id: 'karate',
    name: 'Karate',
    subtitle: 'El Arte del Golpe Explosivo',
    origin: 'Okinawa, Japón, s. XIV-XVI',
    color: 'from-purple-600 to-purple-900',
    accentColor: '#9333EA',
    bgGlow: 'rgba(147,51,234,0.08)',
    videoId: 'rIoQAbiW35Q',
    description: 'El Karate ha resurgido en UFC con luchadores que usan posturas laterales y golpes explosivos e impredecibles.',
    history: 'Originario de Okinawa, el Karate llegó a Japón en el siglo XX. Stephen Thompson y Lyoto Machida revolucionaron el striking.',
    stats: { poder: 85, velocidad: 90, resistencia: 75, kos: 68, defensa: 82 },
    techniques: [
      { name: 'Reverse Punch', desc: 'Golpe recto de karate.' },
      { name: 'Side Kick', desc: 'Patada lateral penetrante.' },
      { name: 'Roundhouse', desc: 'Patada circular con cadera.' },
      { name: 'Crescent Kick', desc: 'Patada de media luna.' },
      { name: 'Karate Stance', desc: 'Guardia lateral.' },
    ],
    topExponents: [6, 4],
    pros: ['Distancias inusuales', 'Potencia explosiva'],
    cons: ['Vulnerable en el clinch', 'Menos efectivo en suelo'],
    famousKOs: ['Thompson vs Hendricks', 'Machida vs Shogun'],
  },
  {
    id: 'taekwondo',
    name: 'Taekwondo',
    subtitle: 'El Arte de las Patadas Espectaculares',
    origin: 'Corea, s. I a.C. (codificado 1955)',
    color: 'from-slate-700 to-slate-900',
    accentColor: '#64748B',
    bgGlow: 'rgba(100,116,139,0.08)',
    videoId: 'dpQcOLc4ErQ',
    description: 'El Taekwondo aporta las patadas más espectaculares y menos predecibles del mundo. Yair Rodríguez y Anthony Pettis son sus máximos exponentes.',
    history: 'Con raíces en artes coreanas antiguas, el TKD moderno fue codificado en 1955. Se convirtió en deporte olímpico en 2000.',
    stats: { poder: 78, velocidad: 95, resistencia: 70, kos: 65, defensa: 65 },
    techniques: [
      { name: 'Spinning Hook Kick', desc: 'El nocaut más devastador.' },
      { name: 'Wheel Kick', desc: '360° a la cabeza.' },
      { name: 'Ax Kick', desc: 'Patada de hacha.' },
      { name: 'Side Kick', desc: 'Patada lateral al cuerpo.' },
      { name: '360 Kick', desc: 'Giro completo.' },
    ],
    topExponents: [5, 7],
    pros: ['KOs espectaculares', 'Velocidad inigualable'],
    cons: ['Vulnerable en suelo', 'Difícil bajo presión'],
    famousKOs: ['Pettis vs Henderson', 'Rodríguez vs Holloway'],
  },
];

// ─── MAPA DE LUCHADORES ────────────────────────────────────────────
const fighterMap: Record<number, { name: string; id: number; country: string; title: string; imageUrl: string }> = {
  1: { name: 'Jon Jones', id: 1, country: 'Estados Unidos', title: 'Campeón Peso Pesado', imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-10/JONES_JON_L.png?itok=YzChKhrF' },
  2: { name: 'Islam Makhachev', id: 2, country: 'Rusia', title: 'Campeón Peso Ligero', imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-01/7/MAKHACHEV_ISLAM_L_BELT_01-18.png?itok=rmEnE1y2' },
  3: { name: 'Alexandre Pantoja', id: 3, country: 'Brasil', title: 'Campeón Peso Mosca', imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-12/PANTOJA_ALEXANDRE_L_07-08.png?itok=cpEeWowD' },
  4: { name: 'Leon Edwards', id: 4, country: 'Inglaterra', title: 'Ex Campeón Welter', imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-11/EDWARDS_LEON_L_11-15.png?itok=-8gaMhP0' },
  5: { name: 'Israel Adesanya', id: 5, country: 'Nigeria', title: 'Ex Campeón Peso Medio', imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-01/ADESANYA_ISRAEL_L_02-01.png?itok=oLGG2Lmg' },
  6: { name: 'Alexander Volkanovski', id: 6, country: 'Australia', title: 'Ex Campeón Pluma', imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2026-01/VOLKANOVSKI_ALEXANDER_L_BELT_01-31.png?itok=03AEGqgT' },
  7: { name: "Sean O'Malley", id: 7, country: 'Estados Unidos', title: 'Ex Campeón Peso Gallo', imageUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mma/players/full/4205093.png&w=350&h=254' },
  8: { name: 'Zhang Weili', id: 8, country: 'China', title: 'Campeona Peso Paja', imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2022-06/d6bd47bc-d423-4ae8-9073-f0abd7777751%252FWEILI_ZHANG_L_06-11.png?itok=RNACun7r' },
  9: { name: 'Alex Pereira', id: 9, country: 'Brasil', title: 'Campeón Semipesado', imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-03/PEREIRA_ALEX_L_BELT_03-08.png?itok=VjmnG4ZQ' },
  11: { name: 'Dricus du Plessis', id: 11, country: 'Sudáfrica', title: 'Campeón Peso Medio', imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-08/DU_PLESSIS_DRICUS_L_01-20.png?itok=qi60J25b' },
  13: { name: 'Khabib Nurmagomedov', id: 13, country: 'Rusia', title: 'Leyenda / Invicto 29-0', imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/image/fighter_images/Khabib_Nurmagomedov/1NURMAGOMEDOV_KHABIB_L.png?itok=wy8QdF9L' },
  14: { name: 'Georges St-Pierre', id: 14, country: 'Canadá', title: 'Leyenda / GOAT Welter', imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/image/ufc-fighter-container/68009/profile-galery/fullbodyleft-picture/Georges-St-Pierre_318_LeftFullBodyImage.png?itok=YRZwQSl-' },
  15: { name: 'Anderson Silva', id: 15, country: 'Brasil', title: 'Leyenda / GOAT Medio', imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/image/fighter_images/Anderson_Silva/SILVA_ANDERSON_L.png?itok=vR9mL2nK' },
  17: { name: 'Conor McGregor', id: 17, country: 'Irlanda', title: 'Leyenda / 2 Divisiones', imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2021-07/MCGREGOR_CONOR_L_07-10.png?itok=GGdEvNOI' },
  18: { name: 'Ronda Rousey', id: 18, country: 'Estados Unidos', title: 'Leyenda / Primera Campeona', imageUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mma/players/full/2563796.png&w=350&h=254' },
  19: { name: 'Dustin Poirier', id: 19, country: 'Estados Unidos', title: 'Ex Campeón Interino Ligero', imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-01/5/POIRIER_DUSTIN_L_06-01.png?itok=L4Jvzl-6' },
  20: { name: 'Charles Oliveira', id: 20, country: 'Brasil', title: 'Ex Campeón Peso Ligero', imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-10/OLIVEIRA_CHARLES_L_10-11.png?itok=A20hEXoe' },
};

// ─── COMPONENTE STATBAR ────────────────────────────────────────────
function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-ufc-gray uppercase tracking-wider">{label}</span>
        <span className="font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-2 bg-ufc-dark rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// ─── COMPONENTE FIGHTER CARD ───────────────────────────────────────
function FighterCard({ fighterId }: { fighterId: number }) {
  const fighter = fighterMap[fighterId];
  const [imgError, setImgError] = useState(false);
  const countryCode = getCountryCode(fighter?.country || '');

  if (!fighter) return null;

  return (
    <Link
      href={`/fighters/${fighter.id}`}
      className="group/card relative overflow-hidden bg-ufc-dark rounded-xl border border-ufc-black hover:border-ufc-red transition-all duration-300 flex flex-col hover:scale-[1.02] hover:shadow-xl hover:shadow-red-900/20"
    >
      <div className="relative h-40 sm:h-48 overflow-hidden bg-ufc-black">
        {!imgError ? (
          <img
            src={fighter.imageUrl}
            alt={fighter.name}
            className="w-full h-full object-cover object-top group-hover/card:scale-110 transition-transform duration-500"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-ufc-dark">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-ufc-red to-ufc-dark flex items-center justify-center text-white text-2xl sm:text-3xl font-black">
              {fighter.name.charAt(0)}
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ufc-dark via-transparent to-transparent" />
        <div className="absolute top-2 right-2">
          <Flags code={countryCode} style={{ width: 24, height: 18 }} className="rounded shadow-sm" />
        </div>
      </div>
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-white font-bold text-sm sm:text-base leading-tight group-hover/card:text-ufc-red transition-colors">
            {fighter.name}
          </p>
          <p className="text-ufc-gray text-xs mt-1 leading-tight">{fighter.title}</p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-ufc-gray text-xs">Ver perfil</span>
          <ChevronRight size={14} className="text-ufc-gray group-hover/card:translate-x-1 group-hover/card:text-ufc-red transition-all" />
        </div>
      </div>
    </Link>
  );
}

// ─── COMPONENTE VIDEO EMBED ────────────────────────────────────────
function VideoEmbed({ videoId, title }: { videoId: string; title: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgError, setImgError] = useState(false);

  const thumbnailUrl = imgError
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-ufc-black group/video cursor-pointer border border-ufc-dark hover:border-ufc-red/30 transition-colors">
      {!isPlaying ? (
        <>
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover group-hover/video:scale-105 transition-transform duration-500 opacity-70"
            onError={() => setImgError(true)}
            loading="lazy"
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
            onClick={() => setIsPlaying(true)}
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-ufc-red/20 backdrop-blur-sm border border-ufc-red/30 flex items-center justify-center group-hover/video:bg-ufc-red/30 transition-all duration-300 group-hover/video:scale-110 shadow-lg">
              <Play size={20} className="text-white ml-1" fill="white" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-ufc-black/90 to-transparent">
            <p className="text-white text-xs font-medium">{title}</p>
          </div>
        </>
      ) : (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      )}
    </div>
  );
}

// ─── PÁGINA PRINCIPAL ──────────────────────────────────────────────
export default function DisciplinesPage() {
  const [activeTab, setActiveTab] = useState<Record<string, 'info' | 'techniques' | 'fighters'>>({});
  const [showScrollButton, setShowScrollButton] = useState(false);
  const ticking = useRef(false);

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

  const getTab = (id: string) => activeTab[id] || 'info';
  const setTab = (id: string, tab: 'info' | 'techniques' | 'fighters') =>
    setActiveTab((prev) => ({ ...prev, [id]: tab }));

  return (
    <main className="min-h-screen bg-ufc-black text-white overflow-x-hidden">
      {/* HERO SECTION (sin cambios) */}
      <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-20 px-4 border-b bg-gradient-to-b from-ufc-dark to-ufc-black border-ufc-gold/30">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-ufc-red/5 blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-ufc-gold/5 blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white uppercase tracking-tight">
            Las Artes del{' '}
            <span className="text-ufc-red">Octágono</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-ufc-gray/90 mt-4 sm:mt-6 max-w-3xl mx-auto leading-relaxed">
            Ocho disciplinas. Un octágono. Los mejores luchadores del mundo las dominan todas.
          </p>

          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mt-8 sm:mt-10">
            {[
              { label: 'Disciplinas', value: '8' },
              { label: 'Luchadores', value: '20' },
              { label: 'Campeones', value: '12' },
              { label: 'KOs icónicos', value: '24+' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-ufc-gold">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-ufc-gray mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCIPLINAS CARDS */}
      <section className="max-w-7xl mx-auto px-4 py-12 space-y-8 sm:space-y-12">
        {disciplines.map((discipline, idx) => (
          <article
            key={discipline.id}
            className="relative rounded-2xl overflow-hidden border border-ufc-black hover:border-ufc-red/30 transition-all duration-500 bg-ufc-dark animate-fadeIn"
            style={{ animationDelay: `${Math.min(idx * 80, 400)}ms` }}
          >
            <div className={`h-1 w-full bg-gradient-to-r ${discipline.color}`} />

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at ${idx % 2 === 0 ? '0%' : '100%'} 0%, ${discipline.bgGlow} 0%, transparent 60%)`,
              }}
            />

            <div className="relative p-5 sm:p-6 md:p-8 lg:p-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-6 sm:mb-8 gap-3">
                <div className="flex items-center gap-3 sm:gap-5 flex-1 min-w-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border border-ufc-black bg-ufc-black shrink-0">
                    {DisciplineIcons[discipline.id]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[0.65rem] sm:text-xs uppercase tracking-[0.15em] mb-1 break-words leading-tight"
                      style={{ color: discipline.accentColor }}
                    >
                      {discipline.origin}
                    </p>
                    <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                      {discipline.name}
                    </h2>
                    <p className="text-ufc-gray text-xs sm:text-sm md:text-base mt-0.5 sm:mt-1">
                      {discipline.subtitle}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:block text-6xl sm:text-8xl md:text-[100px] font-black leading-none select-none flex-shrink-0 text-ufc-dark/50">
                  {String(idx + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Grid principal */}
              <div className="grid lg:grid-cols-5 gap-8">
                {/* Columna izquierda */}
                <div className="lg:col-span-2 space-y-6">
                  <VideoEmbed videoId={discipline.videoId} title={`${discipline.name} en UFC — Highlights`} />

                  <div className="bg-ufc-black rounded-xl p-5 sm:p-6 border border-ufc-dark space-y-4">
                    <h3 className="text-xs uppercase tracking-[0.2em] text-ufc-gray mb-4 flex items-center gap-2">
                      <TrendingUp size={14} className="text-ufc-gold" />
                      Estadísticas de Efectividad
                    </h3>
                    <StatBar label="Poder" value={discipline.stats.poder} color={discipline.accentColor} />
                    <StatBar label="Velocidad" value={discipline.stats.velocidad} color={discipline.accentColor} />
                    <StatBar label="Resistencia" value={discipline.stats.resistencia} color={discipline.accentColor} />
                    <StatBar label="Tasa KO/Sub" value={discipline.stats.kos} color={discipline.accentColor} />
                    <StatBar label="Defensa" value={discipline.stats.defensa} color={discipline.accentColor} />
                  </div>

                  {/* Fortalezas / Debilidades */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-ufc-black border border-ufc-dark rounded-xl p-5">
                      <h4 className="text-xs uppercase tracking-widest text-green-500 mb-3 flex items-center gap-1">
                        <Shield size={12} /> Fortalezas
                      </h4>
                      <ul className="space-y-2">
                        {discipline.pros.map((pro) => (
                          <li key={pro} className="text-xs text-ufc-gray flex items-start gap-1">
                            <span className="text-green-500 mt-0.5 shrink-0">+</span> {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-ufc-black border border-ufc-dark rounded-xl p-5">
                      <h4 className="text-xs uppercase tracking-widest text-ufc-red mb-3 flex items-center gap-1">
                        <Zap size={12} /> Debilidades
                      </h4>
                      <ul className="space-y-2">
                        {discipline.cons.map((con) => (
                          <li key={con} className="text-xs text-ufc-gray flex items-start gap-1">
                            <span className="text-ufc-red mt-0.5 shrink-0">−</span> {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Columna derecha */}
                <div className="lg:col-span-3 flex flex-col">
                  <div className="flex gap-1 mb-6 bg-ufc-black p-1 rounded-xl border border-ufc-dark w-full overflow-x-auto">
                    {(['info', 'techniques', 'fighters'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setTab(discipline.id, tab)}
                        className={`flex-1 px-3 sm:px-5 py-2 rounded-lg text-[0.65rem] sm:text-xs uppercase tracking-widest font-semibold transition-all duration-200 whitespace-nowrap ${
                          getTab(discipline.id) === tab
                            ? 'bg-ufc-red text-white shadow-lg shadow-red-900/30'
                            : 'text-ufc-gray hover:text-white hover:bg-ufc-red/10'
                        }`}
                      >
                        {tab === 'info' ? 'Información' : tab === 'techniques' ? 'Técnicas' : 'Luchadores'}
                      </button>
                    ))}
                  </div>

                  {/* Panel INFO */}
                  {getTab(discipline.id) === 'info' && (
                    <div className="flex-1 space-y-6">
                      <div>
                        <h3 className="text-white text-lg md:text-xl font-bold mb-3">¿Qué es el {discipline.name}?</h3>
                        <p className="text-ufc-gray leading-relaxed text-sm md:text-base">{discipline.description}</p>
                      </div>
                      <div className="h-px bg-ufc-dark" />
                      <div>
                        <h3 className="text-xs uppercase tracking-[0.2em] text-ufc-gray mb-3 flex items-center gap-2">
                          <Clock size={14} className="text-ufc-gold" /> Historia
                        </h3>
                        <p className="text-ufc-gray leading-relaxed text-sm">{discipline.history}</p>
                      </div>
                      <div className="h-px bg-ufc-dark" />
                      <div>
                        <h3 className="text-xs uppercase tracking-[0.2em] text-ufc-gray mb-3 flex items-center gap-2">
                          <Star size={14} className="text-ufc-gold" /> Momentos Icónicos
                        </h3>
                        <ul className="space-y-2">
                          {discipline.famousKOs.map((ko, i) => (
                            <li
                              key={ko}
                              className="flex items-center gap-3 text-xs sm:text-sm text-ufc-gray bg-ufc-black rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 border border-ufc-dark hover:border-ufc-red/30 transition-colors"
                            >
                              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 bg-ufc-red/20 text-ufc-red">
                                {i + 1}
                              </span>
                              {ko}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Panel TÉCNICAS */}
                  {getTab(discipline.id) === 'techniques' && (
                    <div className="flex-1 space-y-3">
                      <p className="text-ufc-gray text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Target size={14} className="text-ufc-gold" /> Técnicas Principales
                      </p>
                      {discipline.techniques.map((tech, i) => (
                        <div
                          key={tech.name}
                          className="group/tech flex gap-4 p-4 rounded-xl border border-ufc-dark hover:border-ufc-red transition-all duration-200 bg-ufc-black hover:scale-[1.01]"
                        >
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-black shrink-0 bg-ufc-red/20 text-ufc-red">
                            {String(i + 1).padStart(2, '0')}
                          </div>
                          <div>
                            <p className="text-white font-bold text-base group-hover/tech:text-ufc-red transition">
                              {tech.name}
                            </p>
                            <p className="text-ufc-gray text-sm mt-0.5">{tech.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Panel LUCHADORES */}
                  {getTab(discipline.id) === 'fighters' && (
                    <div className="flex-1">
                      <p className="text-ufc-gray text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Award size={14} className="text-ufc-gold" /> Máximos Exponentes en UFC
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {discipline.topExponents.map((id) => (
                          <FighterCard key={id} fighterId={id} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* FOOTER CTA */}
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-b from-ufc-black to-ufc-dark border-t border-ufc-dark/50">
        <div className="max-w-4xl mx-auto text-center">
          <Flame className="w-8 h-8 text-ufc-red mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            La Combinación es el Secreto
          </h2>
          <p className="text-ufc-gray mb-8 max-w-xl mx-auto">
            Ningún luchador domina una sola disciplina. Los campeones entienden todas.
          </p>
          <Link
            href="/fighters"
            className="inline-flex items-center gap-2 px-8 py-4 bg-ufc-red hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-900/40 group"
          >
            Ver Todos los Luchadores
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
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
    </main>
  );
}