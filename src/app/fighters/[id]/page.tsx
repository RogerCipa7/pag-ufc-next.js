// app/fighters/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ArrowLeft,
  Award,
  Calendar,
  Flag,
  Ruler,
  Weight,
  Activity,
  Star,
  Shield,
  Globe,
  Target,
  Zap,
  Trophy,
  Users,
} from 'lucide-react';
import Flags from 'react-world-flags';

// ─── MAPEO DE PAÍSES A CÓDIGOS ISO 3166-1 alpha-3 ──────────────────
const getCountryCode = (country: string): string => {
  const codes: Record<string, string> = {
    'Estados Unidos': 'USA',
    'Rusia': 'RUS',
    'Brasil': 'BRA',
    'Inglaterra': 'GBR',
    'Nigeria': 'NGA',
    'Australia': 'AUS',
    'China': 'CHN',
    'España': 'ESP',
    'Sudáfrica': 'ZAF',
    'Georgia': 'GEO',
    'Canadá': 'CAN',
    'Irlanda': 'IRL',
  };
  return codes[country] || 'USA';
};

// ─── INTERFAZ DEL LUCHADOR ───────────────────────────────────────────
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
  height: string;
  reach: string;
  age: number;
  stance: string;
  bio: string;
  achievements: string[];
  stats: {
    significantStrikes: string;
    strikingAccuracy: string;
    takedowns: string;
    takedownAccuracy: string;
    submissionAttempts: string;
  };
  recentFights: {
    opponent: string;
    result: 'W' | 'L' | 'NC' | 'D';
    method: string;
    date: string;
    event: string;
  }[];
}

// ─── BASE DE DATOS COMPLETA DE LUCHADORES ────────────────────────────
const fightersData: Fighter[] = [
  // ═══════════════════════════════════════════════════════════════════
  // CAMPEONES ACTIVOS (12)
  // ═══════════════════════════════════════════════════════════════════

  // 1. JON JONES
  {
    id: 1,
    name: 'Jon Jones',
    nickname: 'Bones',
    record: '27-1-0 (1 NC)',
    weightClass: 'Peso Pesado',
    country: 'Estados Unidos',
    flag: 'USA',
    champion: true,
    legend: false,
    imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-10/JONES_JON_L.png?itok=YzChKhrF',
    height: '1.93 m',
    reach: '2.15 m',
    age: 37,
    stance: 'Orthodox',
    bio: 'Jon Jones es ampliamente considerado el mejor peleador en la historia de las MMA. Campeón de peso pesado y ex campeón de peso semipesado, ha derrotado a todos los que se han cruzado en su camino gracias a su creatividad, wrestling y coeficiente intelectual en la jaula.',
    achievements: [
      'Campeón de Peso Pesado UFC (Actual)',
      'Ex Campeón de Peso Semipesado UFC (récord de 11 defensas)',
      'Luchador más joven en ganar un título UFC (23 años)',
      'Racha de 19 victorias consecutivas en UFC',
      'Miembro del Salón de la Fama (Fight Wing)',
    ],
    stats: {
      significantStrikes: '4.29 por min',
      strikingAccuracy: '58%',
      takedowns: '2.07 por 15 min',
      takedownAccuracy: '43%',
      submissionAttempts: '0.6 por 15 min',
    },
    recentFights: [
      { opponent: 'Ciryl Gane', result: 'W', method: 'Sumisión (Guillotine)', date: 'Mar 2023', event: 'UFC 285' },
      { opponent: 'Dominick Reyes', result: 'W', method: 'Decisión Unánime', date: 'Feb 2020', event: 'UFC 247' },
      { opponent: 'Thiago Santos', result: 'W', method: 'Decisión Dividida', date: 'Jul 2019', event: 'UFC 239' },
    ],
  },

  // 2. ISLAM MAKHACHEV
  {
    id: 2,
    name: 'Islam Makhachev',
    nickname: 'The Eagle',
    record: '26-1-0',
    weightClass: 'Peso Ligero',
    country: 'Rusia',
    flag: 'RUS',
    champion: true,
    legend: false,
    imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-01/7/MAKHACHEV_ISLAM_L_BELT_01-18.png?itok=rmEnE1y2',
    height: '1.78 m',
    reach: '1.79 m',
    age: 33,
    stance: 'Southpaw',
    bio: 'Islam Makhachev es el actual campeón de peso ligero y heredero del legado de Khabib. Dominador absoluto en el suelo, combina un Sambo de élite con un striking cada vez más letal.',
    achievements: [
      'Campeón de Peso Ligero UFC (Actual)',
      'Maestro de Deportes en Sambo de Combate',
      'Racha de 13 victorias consecutivas',
      '3 defensas del título',
    ],
    stats: {
      significantStrikes: '3.45 por min',
      strikingAccuracy: '52%',
      takedowns: '3.15 por 15 min',
      takedownAccuracy: '51%',
      submissionAttempts: '1.2 por 15 min',
    },
    recentFights: [
      { opponent: 'Alexander Volkanovski', result: 'W', method: 'KO (Puñetazo)', date: 'Oct 2023', event: 'UFC 294' },
      { opponent: 'Alexander Volkanovski', result: 'W', method: 'Decisión Unánime', date: 'Feb 2023', event: 'UFC 284' },
      { opponent: 'Charles Oliveira', result: 'W', method: 'Sumisión (Arm‑Triangle)', date: 'Oct 2022', event: 'UFC 280' },
    ],
  },

  // 3. ALEXANDRE PANTOJA
  {
    id: 3,
    name: 'Alexandre Pantoja',
    nickname: 'The Cannibal',
    record: '27-5-0',
    weightClass: 'Peso Mosca',
    country: 'Brasil',
    flag: 'BRA',
    champion: true,
    legend: false,
    imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-12/PANTOJA_ALEXANDRE_L_07-08.png?itok=cpEeWowD',
    height: '1.65 m',
    reach: '1.73 m',
    age: 34,
    stance: 'Orthodox',
    bio: 'Alexandre Pantoja es el actual rey del peso mosca. Con un Jiu‑Jitsu letal y un cardio sin límites, ha demostrado ser el mejor de la división venciendo a todos los excampeones.',
    achievements: [
      'Campeón de Peso Mosca UFC (Actual)',
      'Cinturón Negro de Jiu‑Jitsu Brasileño',
      '2 defensas del título',
      'Ganador de The Ultimate Fighter 24',
    ],
    stats: {
      significantStrikes: '4.11 por min',
      strikingAccuracy: '47%',
      takedowns: '1.89 por 15 min',
      takedownAccuracy: '38%',
      submissionAttempts: '0.8 por 15 min',
    },
    recentFights: [
      { opponent: 'Steve Erceg', result: 'W', method: 'Decisión Unánime', date: 'May 2024', event: 'UFC 301' },
      { opponent: 'Brandon Royval', result: 'W', method: 'Decisión Unánime', date: 'Dic 2023', event: 'UFC 296' },
      { opponent: 'Brandon Moreno', result: 'W', method: 'Decisión Dividida', date: 'Jul 2023', event: 'UFC 290' },
    ],
  },

  // 4. LEON EDWARDS
  {
    id: 4,
    name: 'Leon Edwards',
    nickname: 'Rocky',
    record: '22-4-0 (1 NC)',
    weightClass: 'Peso Welter',
    country: 'Inglaterra',
    flag: 'GBR',
    champion: false,
    legend: false,
    imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-11/EDWARDS_LEON_L_11-15.png?itok=-8gaMhP0',
    height: '1.83 m',
    reach: '1.88 m',
    age: 33,
    stance: 'Orthodox',
    bio: 'Leon Edwards es un striker técnico con un juego de piernas excepcional. Su victoria por KO en el último segundo contra Usman lo coronó como campeón y demostró su mentalidad inquebrantable.',
    achievements: [
      'Ex Campeón de Peso Welter UFC',
      'Racha de 10 victorias consecutivas en UFC',
      'KO del Año 2022 vs Usman',
      'Primera defensa exitosa del título',
    ],
    stats: {
      significantStrikes: '4.52 por min',
      strikingAccuracy: '51%',
      takedowns: '0.45 por 15 min',
      takedownAccuracy: '40%',
      submissionAttempts: '0.2 por 15 min',
    },
    recentFights: [
      { opponent: 'Colby Covington', result: 'W', method: 'Decisión Unánime', date: 'Dic 2023', event: 'UFC 296' },
      { opponent: 'Kamaru Usman', result: 'W', method: 'Decisión Mayoritaria', date: 'Mar 2023', event: 'UFC 286' },
      { opponent: 'Kamaru Usman', result: 'W', method: 'KO (Patada a la cabeza)', date: 'Ago 2022', event: 'UFC 278' },
    ],
  },

  // 5. ISRAEL ADESANYA
  {
    id: 5,
    name: 'Israel Adesanya',
    nickname: 'The Last Stylebender',
    record: '24-3-0',
    weightClass: 'Peso Medio',
    country: 'Nigeria',
    flag: 'NGA',
    champion: false,
    legend: false,
    imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-01/ADESANYA_ISRAEL_L_02-01.png?itok=oLGG2Lmg',
    height: '1.93 m',
    reach: '2.03 m',
    age: 35,
    stance: 'Switch',
    bio: 'Israel Adesanya es un striker de élite con background en kickboxing. Su estilo único, creatividad y capacidad para leer a sus oponentes lo convirtieron en uno de los campeones más dominantes de la historia del peso medio.',
    achievements: [
      'Ex Campeón de Peso Medio UFC (2 defensas)',
      'Ex Campeón de Peso Medio de Glory Kickboxing',
      'Racha de 20 victorias consecutivas (MMA/Kickboxing)',
      'Performance of the Night (5 veces)',
    ],
    stats: {
      significantStrikes: '5.12 por min',
      strikingAccuracy: '54%',
      takedowns: '0.0 por 15 min',
      takedownAccuracy: '0%',
      submissionAttempts: '0.0 por 15 min',
    },
    recentFights: [
      { opponent: 'Dricus du Plessis', result: 'L', method: 'Decisión Dividida', date: 'Ago 2024', event: 'UFC 305' },
      { opponent: 'Sean Strickland', result: 'L', method: 'Decisión Unánime', date: 'Sep 2023', event: 'UFC 293' },
      { opponent: 'Alex Pereira', result: 'W', method: 'KO (Puñetazos)', date: 'Abr 2023', event: 'UFC 287' },
    ],
  },

  // 6. ALEXANDER VOLKANOVSKI
  {
    id: 6,
    name: 'Alexander Volkanovski',
    nickname: 'The Great',
    record: '26-3-0',
    weightClass: 'Peso Pluma',
    country: 'Australia',
    flag: 'AUS',
    champion: false,
    legend: false,
    imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2026-01/VOLKANOVSKI_ALEXANDER_L_BELT_01-31.png?itok=03AEGqgT',
    height: '1.68 m',
    reach: '1.82 m',
    age: 36,
    stance: 'Orthodox',
    bio: 'Alexander Volkanovski es un luchador completo con cardio infinito. Ex campeón de peso pluma, ha demostrado ser uno de los más grandes al competir y vencer en dos divisiones de peso simultáneamente.',
    achievements: [
      'Ex Campeón de Peso Pluma UFC (3 defensas)',
      'Reto de doble campeón vs Islam Makhachev',
      'Luchador del Año 2021',
      '5 defensas exitosas en peso pluma',
    ],
    stats: {
      significantStrikes: '6.35 por min',
      strikingAccuracy: '57%',
      takedowns: '2.88 por 15 min',
      takedownAccuracy: '45%',
      submissionAttempts: '0.3 por 15 min',
    },
    recentFights: [
      { opponent: 'Ilia Topuria', result: 'L', method: 'KO (Puñetazos)', date: 'Feb 2024', event: 'UFC 298' },
      { opponent: 'Islam Makhachev', result: 'L', method: 'KO (Puñetazo)', date: 'Oct 2023', event: 'UFC 294' },
      { opponent: 'Islam Makhachev', result: 'L', method: 'Decisión Unánime', date: 'Feb 2023', event: 'UFC 284' },
    ],
  },

  // 7. SEAN O'MALLEY
  {
    id: 7,
    name: "Sean O'Malley",
    nickname: 'Suga',
    record: '17-2-0 (1 NC)',
    weightClass: 'Peso Gallo',
    country: 'Estados Unidos',
    flag: 'USA',
    champion: false,
    legend: false,
    imageUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mma/players/full/4205093.png&w=350&h=254',
    height: '1.80 m',
    reach: '1.83 m',
    age: 30,
    stance: 'Southpaw',
    bio: "Sean O'Malley es un striker creativo e impredecible. Con un estilo único y golpes de poder en ambas manos, cautivó al mundo al ganar el título de peso gallo con una actuación dominante.",
    achievements: [
      'Ex Campeón de Peso Gallo UFC',
      'Performance of the Night (4 veces)',
      'KO del Año 2020 vs Thomas Almeida',
      'Primera victoria por título en round 2',
    ],
    stats: {
      significantStrikes: '6.01 por min',
      strikingAccuracy: '53%',
      takedowns: '0.12 por 15 min',
      takedownAccuracy: '25%',
      submissionAttempts: '0.0 por 15 min',
    },
    recentFights: [
      { opponent: 'Merab Dvalishvili', result: 'L', method: 'Decisión Unánime', date: 'Sep 2024', event: 'UFC 306' },
      { opponent: 'Marlon Vera', result: 'W', method: 'Decisión Unánime', date: 'Ago 2023', event: 'UFC 292' },
      { opponent: 'Aljamain Sterling', result: 'W', method: 'TKO (Puñetazos)', date: 'Ago 2023', event: 'UFC 292' },
    ],
  },

  // 8. ZHANG WEILI
  {
    id: 8,
    name: 'Zhang Weili',
    nickname: 'Magnum',
    record: '24-3-0',
    weightClass: 'Peso Paja',
    country: 'China',
    flag: 'CHN',
    champion: true,
    legend: false,
    imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2022-06/d6bd47bc-d423-4ae8-9073-f0abd7777751%252FWEILI_ZHANG_L_06-11.png?itok=RNACun7r',
    height: '1.63 m',
    reach: '1.60 m',
    age: 35,
    stance: 'Orthodox',
    bio: 'Zhang Weili es la primera campeona china del UFC. Con poder explosivo, wrestling sólido y una mentalidad de acero, ha dominado la división de peso paja femenino con actuaciones memorables.',
    achievements: [
      'Campeona de Peso Paja Femenino UFC (Actual)',
      'Primera campeona china en la historia del UFC',
      'Pelea del Año 2020 vs Joanna Jędrzejczyk',
      '4 defensas exitosas del título',
    ],
    stats: {
      significantStrikes: '5.88 por min',
      strikingAccuracy: '49%',
      takedowns: '1.23 por 15 min',
      takedownAccuracy: '42%',
      submissionAttempts: '0.4 por 15 min',
    },
    recentFights: [
      { opponent: 'Yan Xiaonan', result: 'W', method: 'Sumisión (Rear-Naked)', date: 'Abr 2024', event: 'UFC 300' },
      { opponent: 'Amanda Lemos', result: 'W', method: 'Sumisión (Rear-Naked)', date: 'Ago 2023', event: 'UFC 292' },
      { opponent: 'Carla Esparza', result: 'W', method: 'Sumisión (Rear-Naked)', date: 'Nov 2022', event: 'UFC 281' },
    ],
  },

  // 9. ALEX PEREIRA
  {
    id: 9,
    name: 'Alex Pereira',
    nickname: 'Poatan',
    record: '12-2-0',
    weightClass: 'Peso Semipesado',
    country: 'Brasil',
    flag: 'BRA',
    champion: true,
    legend: false,
    imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-03/PEREIRA_ALEX_L_BELT_03-08.png?itok=VjmnG4ZQ',
    height: '1.94 m',
    reach: '2.00 m',
    age: 37,
    stance: 'Orthodox',
    bio: 'Alex "Poatan" Pereira es una fuerza de la naturaleza. Ex campeón de kickboxing GLORY, posee uno de los golpes más letales del MMA y ha conquistado dos divisiones del UFC con su poder devastador.',
    achievements: [
      'Campeón de Peso Semipesado UFC (Actual)',
      'Ex Campeón de Peso Medio UFC',
      'Ex Campeón de GLORY Kickboxing (2 divisiones)',
      'Único en ser campeón en UFC y GLORY',
    ],
    stats: {
      significantStrikes: '5.67 por min',
      strikingAccuracy: '61%',
      takedowns: '0.0 por 15 min',
      takedownAccuracy: '0%',
      submissionAttempts: '0.0 por 15 min',
    },
    recentFights: [
      { opponent: 'Jiří Procházka', result: 'W', method: 'TKO (Puñetazos)', date: 'Nov 2023', event: 'UFC 295' },
      { opponent: 'Jan Błachowicz', result: 'W', method: 'Decisión Dividida', date: 'Jul 2023', event: 'UFC 291' },
      { opponent: 'Israel Adesanya', result: 'W', method: 'KO (Puñetazos)', date: 'Abr 2023', event: 'UFC 287' },
    ],
  },

  // 10. ILIA TOPURIA
  {
    id: 10,
    name: 'Ilia Topuria',
    nickname: 'El Matador',
    record: '15-0-0',
    weightClass: 'Peso Pluma',
    country: 'España',
    flag: 'ESP',
    champion: true,
    legend: false,
    imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2024-10/TOPURIA_ILIA_L_BELT_10-26.png?itok=dzzDUXEu',
    height: '1.70 m',
    reach: '1.75 m',
    age: 28,
    stance: 'Orthodox',
    bio: 'Ilia Topuria es la nueva sensación del peso pluma. Invicto, con un grappling de élite y poder de KO, se coronó campeón al noquear a Alexander Volkanovski y se perfila como el futuro de la división.',
    achievements: [
      'Campeón de Peso Pluma UFC (Actual)',
      'Récord invicto: 15-0',
      'Primer campeón español del UFC',
      'KO del Año 2024 vs Volkanovski',
    ],
    stats: {
      significantStrikes: '4.89 por min',
      strikingAccuracy: '56%',
      takedowns: '2.34 por 15 min',
      takedownAccuracy: '58%',
      submissionAttempts: '1.1 por 15 min',
    },
    recentFights: [
      { opponent: 'Alexander Volkanovski', result: 'W', method: 'KO (Puñetazos)', date: 'Feb 2024', event: 'UFC 298' },
      { opponent: 'Josh Emmett', result: 'W', method: 'Decisión Unánime', date: 'Jun 2023', event: 'UFC on ABC 5' },
      { opponent: 'Bryce Mitchell', result: 'W', method: 'Sumisión (Rear-Naked)', date: 'Dic 2022', event: 'UFC 282' },
    ],
  },

  // 11. DRICUS DU PLESSIS
  {
    id: 11,
    name: 'Dricus du Plessis',
    nickname: 'Stillknocks',
    record: '21-2-0',
    weightClass: 'Peso Medio',
    country: 'Sudáfrica',
    flag: 'ZAF',
    champion: true,
    legend: false,
    imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-08/DU_PLESSIS_DRICUS_L_01-20.png?itok=qi60J25b',
    height: '1.85 m',
    reach: '1.93 m',
    age: 31,
    stance: 'Orthodox',
    bio: 'Dricus du Plessis es un guerrero sudafricano con un estilo agresivo y cardio inagotable. Campeón de peso medio, combina striking potente con wrestling sólido para imponerse en cualquier escenario.',
    achievements: [
      'Campeón de Peso Medio UFC (Actual)',
      'Primer campeón sudafricano del UFC',
      'Victorias sobre ex campeones (Adesanya, Strickland)',
      'Performance of the Night (2 veces)',
    ],
    stats: {
      significantStrikes: '4.76 por min',
      strikingAccuracy: '48%',
      takedowns: '2.15 por 15 min',
      takedownAccuracy: '44%',
      submissionAttempts: '0.7 por 15 min',
    },
    recentFights: [
      { opponent: 'Israel Adesanya', result: 'W', method: 'Decisión Dividida', date: 'Ago 2024', event: 'UFC 305' },
      { opponent: 'Sean Strickland', result: 'W', method: 'Decisión Dividida', date: 'Ene 2024', event: 'UFC 297' },
      { opponent: 'Robert Whittaker', result: 'W', method: 'TKO (Puñetazos)', date: 'Jul 2023', event: 'UFC 290' },
    ],
  },

  // 12. MERAB DVALISHVILI
  {
    id: 12,
    name: 'Merab Dvalishvili',
    nickname: 'The Machine',
    record: '17-4-0',
    weightClass: 'Peso Gallo',
    country: 'Georgia',
    flag: 'GEO',
    champion: false,
    legend: false,
    imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2022-08/DVALISHVILI_MERAB_L_08-20.png?itok=9Aqfr1In',
    height: '1.68 m',
    reach: '1.73 m',
    age: 34,
    stance: 'Orthodox',
    bio: 'Merab Dvalishvili es una máquina de presión constante. Con un ritmo infernal y wrestling de élite, desgasta a sus rivales hasta la victoria. Campeón de peso gallo, representa el futuro de la división.',
    achievements: [
      'Campeón de Peso Gallo UFC (Actual)',
      'Racha de 10 victorias consecutivas',
      'Más takedowns en historia del peso gallo',
      'Luchador con más tiempo de control en suelo',
    ],
    stats: {
      significantStrikes: '3.98 por min',
      strikingAccuracy: '44%',
      takedowns: '7.82 por 15 min',
      takedownAccuracy: '52%',
      submissionAttempts: '0.3 por 15 min',
    },
    recentFights: [
      { opponent: "Sean O'Malley", result: 'W', method: 'Decisión Unánime', date: 'Sep 2024', event: 'UFC 306' },
      { opponent: 'Henry Cejudo', result: 'W', method: 'Decisión Unánime', date: 'May 2024', event: 'UFC 300' },
      { opponent: 'Petr Yan', result: 'W', method: 'Decisión Unánime', date: 'Mar 2023', event: 'UFC Fight Night' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // LEYENDAS DEL OCTÁGONO (6)
  // ═══════════════════════════════════════════════════════════════════

  // 13. KHABIB NURMAGOMEDOV
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
    imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/image/fighter_images/Khabib_Nurmagomedov/1NURMAGOMEDOV_KHABIB_L.png?itok=wy8QdF9L',
    height: '1.78 m',
    reach: '1.78 m',
    age: 36,
    stance: 'Orthodox',
    bio: 'Khabib Nurmagomedov es la leyenda invicta del peso ligero. Con un sambo devastador y una presión incesante, dominó la división durante años y se retiró en la cima con un récord perfecto de 29-0.',
    achievements: [
      'Ex Campeón de Peso Ligero UFC (3 defensas)',
      'Récord invicto: 29-0',
      'Más takedowns en una pelea de título (21)',
      'Luchador del Año 2020',
      'Miembro del Salón de la Fama UFC',
    ],
    stats: {
      significantStrikes: '3.43 por min',
      strikingAccuracy: '50%',
      takedowns: '5.34 por 15 min',
      takedownAccuracy: '48%',
      submissionAttempts: '0.9 por 15 min',
    },
    recentFights: [
      { opponent: 'Justin Gaethje', result: 'W', method: 'Sumisión (Triangle)', date: 'Oct 2020', event: 'UFC 254' },
      { opponent: 'Dustin Poirier', result: 'W', method: 'Sumisión (Rear-Naked)', date: 'Sep 2019', event: 'UFC 242' },
      { opponent: 'Conor McGregor', result: 'W', method: 'Sumisión (Neck Crank)', date: 'Oct 2018', event: 'UFC 229' },
    ],
  },

  // 14. GEORGES ST-PIERRE
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
    imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/image/ufc-fighter-container/68009/profile-galery/fullbodyleft-picture/Georges-St-Pierre_318_LeftFullBodyImage.png?itok=YRZwQSl-',
    height: '1.78 m',
    reach: '1.93 m',
    age: 43,
    stance: 'Orthodox',
    bio: 'Georges St-Pierre es considerado uno de los más grandes de todos los tiempos. Campeón en dos divisiones, combinó wrestling de élite, striking técnico y una preparación mental inigualable para dominar una era.',
    achievements: [
      'Ex Campeón de Peso Welter UFC (9 defensas)',
      'Ex Campeón de Peso Medio UFC',
      'Luchador Canadiense del Siglo',
      'Miembro del Salón de la Fama UFC',
      'Racha de 12 victorias consecutivas en UFC',
    ],
    stats: {
      significantStrikes: '3.25 por min',
      strikingAccuracy: '53%',
      takedowns: '4.12 por 15 min',
      takedownAccuracy: '73%',
      submissionAttempts: '0.4 por 15 min',
    },
    recentFights: [
      { opponent: 'Michael Bisping', result: 'W', method: 'Sumisión (Rear-Naked)', date: 'Nov 2017', event: 'UFC 217' },
      { opponent: 'Johny Hendricks', result: 'W', method: 'Decisión Dividida', date: 'Nov 2013', event: 'UFC 167' },
      { opponent: 'Nick Diaz', result: 'W', method: 'Decisión Unánime', date: 'Ene 2013', event: 'UFC 158' },
    ],
  },

  // 15. ANDERSON SILVA
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
    imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/image/fighter_images/Anderson_Silva/SILVA_ANDERSON_L.png?itok=vR9mL2nK',
    height: '1.88 m',
    reach: '1.97 m',
    age: 49,
    stance: 'Orthodox',
    bio: 'Anderson Silva es la leyenda del peso medio. Con un striking creativo, reflejos sobrehumanos y una capacidad única para finalizar peleas, estableció el récord de más defensas consecutivas del título en la historia del UFC.',
    achievements: [
      'Ex Campeón de Peso Medio UFC (10 defensas - récord)',
      'Racha de 16 victorias consecutivas en UFC',
      'Luchador del Año 2008 y 2012',
      'Miembro del Salón de la Fama UFC',
      'Más tiempo como campeón en UFC (2,457 días)',
    ],
    stats: {
      significantStrikes: '3.97 por min',
      strikingAccuracy: '57%',
      takedowns: '0.32 por 15 min',
      takedownAccuracy: '33%',
      submissionAttempts: '0.8 por 15 min',
    },
    recentFights: [
      { opponent: 'Uriah Hall', result: 'L', method: 'TKO (Puñetazos)', date: 'Oct 2020', event: 'UFC Fight Night' },
      { opponent: 'Jared Brooks', result: 'W', method: 'Decisión Unánime', date: 'Feb 2020', event: 'UFC Fight Night' },
      { opponent: 'Israel Adesanya', result: 'L', method: 'Decisión Unánime', date: 'Oct 2019', event: 'UFC 234' },
    ],
  },

  // 16. CHUCK LIDDELL
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
    imageUrl: 'https://www.ufcespanol.com/images/styles/inline/s3/image/fighter_images/Chuck_Liddell/Chuck_Lidell_500x325.png?VersionId=nFu.E0MD5n832a44osIYA0FFsEy2rdRT&itok=_DmLKIMR',
    height: '1.88 m',
    reach: '1.93 m',
    age: 54,
    stance: 'Orthodox',
    bio: 'Chuck "The Iceman" Liddell es un ícono del MMA. Con un poder de KO devastador y una defensa de takedowns legendaria, fue la cara del UFC durante su explosión mainstream en los años 2000.',
    achievements: [
      'Ex Campeón de Peso Semipesado UFC',
      'Luchador del Año 2004 y 2005',
      'KO del Año (3 veces)',
      'Miembro del Salón de la Fama UFC',
      'Figura clave en la popularización del MMA',
    ],
    stats: {
      significantStrikes: '4.12 por min',
      strikingAccuracy: '52%',
      takedowns: '0.18 por 15 min',
      takedownAccuracy: '25%',
      submissionAttempts: '0.1 por 15 min',
    },
    recentFights: [
      { opponent: 'Rich Franklin', result: 'L', method: 'KO (Puñetazo)', date: 'Nov 2010', event: 'UFC 129' },
      { opponent: 'Rashad Evans', result: 'L', method: 'KO (Puñetazo)', date: 'Feb 2009', event: 'UFC 97' },
      { opponent: 'Tito Ortiz', result: 'W', method: 'KO (Puñetazos)', date: 'Oct 2006', event: 'UFC 66' },
    ],
  },

  // 17. CONOR MCGREGOR
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
    imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2021-07/MCGREGOR_CONOR_L_07-10.png?itok=GGdEvNOI',
    height: '1.75 m',
    reach: '1.88 m',
    age: 36,
    stance: 'Southpaw',
    bio: 'Conor McGregor es la superestrella global del MMA. Primer luchador en tener dos títulos simultáneamente, su poder de izquierda, carisma y mentalidad lo convirtieron en el atleta de combate más famoso del mundo.',
    achievements: [
      'Ex Campeón de Peso Ligero UFC',
      'Ex Campeón de Peso Pluma UFC',
      'Primer campeón simultáneo en dos divisiones',
      'PPV más vendido en historia del UFC',
      'Luchador Irlandés del Año (5 veces)',
    ],
    stats: {
      significantStrikes: '5.32 por min',
      strikingAccuracy: '49%',
      takedowns: '0.67 por 15 min',
      takedownAccuracy: '55%',
      submissionAttempts: '0.2 por 15 min',
    },
    recentFights: [
      { opponent: 'Dustin Poirier', result: 'L', method: 'TKO (Lesión)', date: 'Jul 2021', event: 'UFC 264' },
      { opponent: 'Dustin Poirier', result: 'L', method: 'TKO (Puñetazos)', date: 'Ene 2021', event: 'UFC 257' },
      { opponent: 'Donald Cerrone', result: 'W', method: 'TKO (Puñetazos)', date: 'Ene 2020', event: 'UFC 246' },
    ],
  },

  // 18. RONDA ROUSEY
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
    imageUrl: 'https://a.espncdn.com/combiner/i?img=/i/headshots/mma/players/full/2563796.png&w=350&h=254',
    height: '1.70 m',
    reach: '1.69 m',
    age: 38,
    stance: 'Orthodox',
    bio: 'Ronda Rousey es la pionera del MMA femenino. Con un judo olímpico y un armbar devastador, dominó la división de peso gallo y abrió las puertas para que las mujeres compitieran en el UFC.',
    achievements: [
      'Ex Campeona de Peso Gallo Femenino UFC',
      'Primera mujer en el Salón de la Fama UFC',
      '6 defensas exitosas del título',
      'Medalla de Bronce Olímpica en Judo 2008',
      'Deportista Femenina del Año ESPN (2015)',
    ],
    stats: {
      significantStrikes: '4.98 por min',
      strikingAccuracy: '45%',
      takedowns: '3.21 por 15 min',
      takedownAccuracy: '62%',
      submissionAttempts: '2.4 por 15 min',
    },
    recentFights: [
      { opponent: 'Amanda Nunes', result: 'L', method: 'TKO (Puñetazos)', date: 'Dic 2016', event: 'UFC 207' },
      { opponent: 'Holly Holm', result: 'L', method: 'KO (Patada a la cabeza)', date: 'Nov 2015', event: 'UFC 193' },
      { opponent: 'Bethe Correia', result: 'W', method: 'KO (Puñetazo)', date: 'Ago 2015', event: 'UFC 190' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // NUEVOS: DUSTIN POIRIER y CHARLES OLIVEIRA (Activos, excampeones)
  // ═══════════════════════════════════════════════════════════════════

  // 19. DUSTIN POIRIER
  {
    id: 19,
    name: 'Dustin Poirier',
    nickname: 'The Diamond',
    record: '30-8-0 (1 NC)',
    weightClass: 'Peso Ligero',
    country: 'Estados Unidos',
    flag: 'USA',
    champion: false,
    legend: false,
    imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-01/5/POIRIER_DUSTIN_L_06-01.png?itok=L4Jvzl-6',
    height: '1.75 m',
    reach: '1.83 m',
    age: 35,
    stance: 'Southpaw',
    bio: 'Dustin Poirier es un veterano de élite y excampeón interino de peso ligero. Conocido por su corazón, poder de nocaut y habilidades de jiu-jitsu, ha vencido a numerosas leyendas y siempre ofrece peleas emocionantes.',
    achievements: [
      'Ex Campeón Interino de Peso Ligero UFC',
      'Ganador del "Forrest Griffin Community Award"',
      'KO del Año 2017 vs Anthony Pettis',
      'Pelea del Año (3 veces) vs Holloway, Gaethje, Hooker',
      'Mayor cantidad de finalizaciones en peso ligero',
    ],
    stats: {
      significantStrikes: '5.01 por min',
      strikingAccuracy: '47%',
      takedowns: '1.53 por 15 min',
      takedownAccuracy: '42%',
      submissionAttempts: '0.6 por 15 min',
    },
    recentFights: [
      { opponent: 'Benoit Saint-Denis', result: 'W', method: 'KO (Puñetazos)', date: 'Mar 2024', event: 'UFC 299' },
      { opponent: 'Justin Gaethje', result: 'L', method: 'KO (Patada a la cabeza)', date: 'Jul 2023', event: 'UFC 291' },
      { opponent: 'Michael Chandler', result: 'W', method: 'Sumisión (Rear-Naked)', date: 'Nov 2022', event: 'UFC 281' },
    ],
  },

  // 20. CHARLES OLIVEIRA
  {
    id: 20,
    name: 'Charles Oliveira',
    nickname: 'Do Bronx',
    record: '34-10-0 (1 NC)',
    weightClass: 'Peso Ligero',
    country: 'Brasil',
    flag: 'BRA',
    champion: false,
    legend: false,
    imageUrl: 'https://www.ufcespanol.com/images/styles/athlete_bio_full_body/s3/2025-10/OLIVEIRA_CHARLES_L_10-11.png?itok=A20hEXoe',
    height: '1.78 m',
    reach: '1.88 m',
    age: 35,
    stance: 'Orthodox',
    bio: 'Charles Oliveira es el excampeón de peso ligero con más sumisiones en la historia del UFC. Su jiu-jitsu de clase mundial y striking mejorado lo convirtieron en uno de los finalizadores más peligrosos de todos los tiempos.',
    achievements: [
      'Ex Campeón de Peso Ligero UFC',
      'Récord de más sumisiones en la historia del UFC (16)',
      'Racha de 11 victorias consecutivas (récord en la división)',
      'Peleador con más finalizaciones en la historia del UFC',
      'Performance of the Night (9 veces)',
    ],
    stats: {
      significantStrikes: '4.38 por min',
      strikingAccuracy: '51%',
      takedowns: '2.15 por 15 min',
      takedownAccuracy: '46%',
      submissionAttempts: '1.9 por 15 min',
    },
    recentFights: [
      { opponent: 'Arman Tsarukyan', result: 'L', method: 'Decisión Dividida', date: 'Abr 2024', event: 'UFC 300' },
      { opponent: 'Beneil Dariush', result: 'W', method: 'KO (Rodillazo)', date: 'Jun 2023', event: 'UFC 289' },
      { opponent: 'Islam Makhachev', result: 'L', method: 'Sumisión (Arm-Triangle)', date: 'Oct 2022', event: 'UFC 280' },
    ],
  },
];

// ─── COMPONENTE PRINCIPAL ────────────────────────────────────────────
export default function FighterProfile() {
  const params = useParams();
  const router = useRouter();
  const fighterId = Number(params.id);
  const fighter = fightersData.find((f) => f.id === fighterId);

  if (!fighter) {
    return (
      <div className="min-h-screen bg-ufc-black flex items-center justify-center pt-32">
        <div className="text-center px-4 max-w-md">
          <div className="text-8xl font-black text-ufc-red mb-4 animate-pulse">
            404
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Luchador no encontrado
          </h1>
          <p className="text-ufc-gray mb-8">
            El guerrero que buscas no está en nuestra base de datos.
          </p>
          <button
            onClick={() => router.push('/fighters')}
            className="inline-flex items-center gap-2 bg-ufc-red hover:bg-red-700 text-white px-6 py-3 rounded-lg transition font-medium group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Volver al roster
          </button>
        </div>
      </div>
    );
  }

  const isLegend = !!fighter.legend;
  const countryCode = getCountryCode(fighter.country);

  return (
    <main className="min-h-screen bg-ufc-black pb-20">
      {/* Botón de volver (siempre visible) */}
      <div className="fixed top-44 left-4 z-50 lg:top-52 lg:left-8">
        <button
          onClick={() => router.push('/fighters')}
          className="flex items-center gap-2 bg-ufc-black/80 backdrop-blur-sm border border-ufc-gray/30 hover:border-ufc-red text-white px-4 py-3 rounded-sm transition-all duration-300 hover:bg-ufc-red/20 group"
          aria-label="Volver a luchadores"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline text-sm font-bold uppercase tracking-wider">Volver</span>
        </button>
      </div>

      {/* Header con altura responsive */}
      <div
        className={`relative pt-44 pb-12 sm:pt-48 sm:pb-16 lg:pt-60 lg:pb-20 overflow-hidden ${isLegend
          ? 'bg-gradient-to-br from-[#1a1500] via-ufc-dark to-ufc-black'
          : 'bg-gradient-to-br from-ufc-dark via-ufc-black to-ufc-black'
          }`}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div
          className={`absolute inset-0 ${isLegend ? 'bg-ufc-gold/5' : 'bg-ufc-red/5'
            }`}
        />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Imagen del luchador */}
            <div className="relative w-full max-w-sm mx-auto lg:mx-0 lg:max-w-md">
              <div
                className={`relative aspect-[3/4] w-full rounded-2xl overflow-hidden border-4 ${isLegend
                  ? 'border-ufc-gold shadow-2xl shadow-ufc-gold/40'
                  : 'border-ufc-red shadow-2xl shadow-ufc-red/40'
                  }`}
              >
                <Image
                  src={fighter.imageUrl}
                  alt={fighter.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top"
                  priority
                />
                {isLegend && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1500]/60 via-transparent to-transparent" />
                )}
              </div>

              {fighter.champion && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-ufc-gold via-yellow-400 to-ufc-gold text-black text-sm sm:text-base font-black py-2 px-6 rounded-full z-20 shadow-lg whitespace-nowrap">
                  <span className="flex items-center gap-2">
                    <Trophy size={16} className="animate-pulse" />
                    CAMPEÓN UFC
                    <Trophy size={16} className="animate-pulse" />
                  </span>
                </div>
              )}
            </div>

            {/* Info principal */}
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Flags
                  code={countryCode}
                  style={{ width: 32, height: 24 }}
                  className="rounded shadow-md"
                />
                <span className="text-ufc-gray flex items-center gap-2 text-sm sm:text-base font-medium">
                  <Globe size={16} />
                  {fighter.country}
                </span>
                {fighter.champion && (
                  <span className="bg-ufc-gold text-black px-3 py-1 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1 shadow-md">
                    <Award size={12} /> ACTUAL CAMPEÓN
                  </span>
                )}
                {isLegend && (
                  <span className="bg-gradient-to-r from-ufc-gold to-yellow-500 text-black px-3 py-1 rounded-full text-xs sm:text-sm font-black flex items-center gap-1 shadow-md">
                    <Star size={12} fill="currentColor" /> LEYENDA
                  </span>
                )}
              </div>

              <div>
                <h1
                  className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-2 leading-tight ${isLegend ? 'text-ufc-gold' : 'text-white'
                    }`}
                >
                  {fighter.name}
                </h1>
                <p className="text-ufc-red text-lg sm:text-xl lg:text-2xl italic font-medium">
                  &quot;{fighter.nickname}&quot;
                </p>
                <p className="text-ufc-gray text-base sm:text-lg mt-2">
                  {fighter.weightClass}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <div
                  className={`px-6 py-3 rounded-xl border ${isLegend
                    ? 'border-ufc-gold/50 bg-gradient-to-r from-ufc-gold/10 to-transparent'
                    : 'border-ufc-red/30 bg-gradient-to-r from-ufc-red/10 to-transparent'
                    }`}
                >
                  <span
                    className={`text-3xl sm:text-4xl font-black ${isLegend ? 'text-ufc-gold' : 'text-white'
                      }`}
                  >
                    {fighter.record}
                  </span>
                  <span className="text-ufc-gray text-sm ml-3">
                    Récord profesional
                  </span>
                </div>
                <div className="flex items-center gap-2 text-ufc-gray text-sm sm:text-base">
                  <Users size={16} />
                  <span>{fighter.age} años</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal (grid) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Columna izquierda (2/3) */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Biografía */}
            <section
              className={`p-6 sm:p-8 rounded-2xl border ${isLegend
                ? 'bg-[#1a1500] border-ufc-gold/30'
                : 'bg-ufc-dark border-ufc-black'
                }`}
            >
              <h2
                className={`text-2xl font-bold mb-5 flex items-center gap-3 ${isLegend ? 'text-ufc-gold' : 'text-white'
                  }`}
              >
                <Activity
                  className={isLegend ? 'text-ufc-gold' : 'text-ufc-red'}
                  size={24}
                />
                Biografía
              </h2>
              <p className="text-ufc-gray leading-relaxed text-base lg:text-lg">
                {fighter.bio}
              </p>
            </section>

            {/* Estadísticas */}
            <section
              className={`p-6 sm:p-8 rounded-2xl border ${isLegend
                ? 'bg-[#1a1500] border-ufc-gold/30'
                : 'bg-ufc-dark border-ufc-black'
                }`}
            >
              <h2
                className={`text-2xl font-bold mb-6 flex items-center gap-3 ${isLegend ? 'text-ufc-gold' : 'text-white'
                  }`}
              >
                <Target
                  className={isLegend ? 'text-ufc-gold' : 'text-ufc-gold'}
                  size={24}
                />
                Estadísticas de Pelea
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(fighter.stats).map(([key, value]) => (
                  <div
                    key={key}
                    className={`p-5 rounded-xl ${isLegend ? 'bg-ufc-black/50' : 'bg-ufc-black'
                      } hover:scale-105 transition-transform duration-200`}
                  >
                    <p className="text-ufc-gray text-xs mb-2 uppercase tracking-wider font-medium">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p
                      className={`text-2xl font-black ${isLegend ? 'text-ufc-gold' : 'text-ufc-red'
                        }`}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Peleas recientes */}
            <section
              className={`p-6 sm:p-8 rounded-2xl border ${isLegend
                ? 'bg-[#1a1500] border-ufc-gold/30'
                : 'bg-ufc-dark border-ufc-black'
                }`}
            >
              <h2
                className={`text-2xl font-bold mb-6 flex items-center gap-3 ${isLegend ? 'text-ufc-gold' : 'text-white'
                  }`}
              >
                <Calendar
                  className={isLegend ? 'text-ufc-gold' : 'text-ufc-white'}
                  size={24}
                />
                Peleas Recientes
              </h2>
              <div className="space-y-4">
                {fighter.recentFights.map((fight, index) => (
                  <div
                    key={index}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl ${isLegend ? 'bg-ufc-black/50' : 'bg-ufc-black'
                      } border-l-4 ${fight.result === 'W'
                        ? 'border-green-500'
                        : fight.result === 'L'
                          ? 'border-red-500'
                          : 'border-yellow-500'
                      }`}
                  >
                    <div className="mb-3 sm:mb-0">
                      <p className="text-white font-bold text-lg">
                        {fight.opponent}
                      </p>
                      <p className="text-ufc-gray text-sm">
                        {fight.event} • {fight.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span
                          className={`text-3xl font-black ${fight.result === 'W'
                            ? 'text-green-500'
                            : fight.result === 'L'
                              ? 'text-red-500'
                              : 'text-yellow-500'
                            }`}
                        >
                          {fight.result}
                        </span>
                        <p className="text-ufc-gray text-sm">
                          {fight.method}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Columna derecha (1/3) - Sticky */}
          <div className="space-y-6 lg:space-y-8">
            <section
              className={`p-6 sm:p-8 rounded-2xl border lg:sticky lg:top-28 ${isLegend
                ? 'bg-[#1a1500] border-ufc-gold/30'
                : 'bg-ufc-dark border-ufc-black'
                }`}
            >
              <h2
                className={`text-2xl font-bold mb-6 ${isLegend ? 'text-ufc-gold' : 'text-white'
                  }`}
              >
                Información Física
              </h2>
              <div className="space-y-5">
                <StatRow
                  icon={Activity}
                  label="Edad"
                  value={`${fighter.age} años`}
                  isLegend={isLegend}
                />
                <StatRow
                  icon={Ruler}
                  label="Altura"
                  value={fighter.height}
                  isLegend={isLegend}
                />
                <StatRow
                  icon={Weight}
                  label="Categoría"
                  value={fighter.weightClass}
                  isLegend={isLegend}
                />
                <StatRow
                  icon={Ruler}
                  label="Alcance"
                  value={fighter.reach}
                  isLegend={isLegend}
                />
                <div className="flex justify-between items-center py-4 border-b border-ufc-black/50 last:border-0">
                  <span className="text-ufc-gray flex items-center gap-3">
                    <Flag
                      size={18}
                      className={isLegend ? 'text-ufc-gold' : 'text-ufc-red'}
                    />
                    País
                  </span>
                  <span className="text-white font-bold flex items-center gap-2">
                    <Flags
                      code={countryCode}
                      style={{ width: 28, height: 20 }}
                      className="rounded-sm"
                    />
                    {fighter.country}
                  </span>
                </div>
                <StatRow
                  icon={Flag}
                  label="Postura"
                  value={fighter.stance}
                  isLegend={isLegend}
                />
              </div>

              {/* Logros */}
              <div className="mt-10 pt-8 border-t border-ufc-black/50">
                <h3
                  className={`text-lg font-bold mb-5 flex items-center gap-2 ${isLegend ? 'text-ufc-gold' : 'text-ufc-gold'
                    }`}
                >
                  <Shield size={20} />
                  Logros Principales
                </h3>
                <ul className="space-y-4">
                  {fighter.achievements.map((achievement, index) => (
                    <li
                      key={index}
                      className="text-ufc-gray text-sm flex items-start gap-3 group"
                    >
                      <span
                        className={`${isLegend ? 'text-ufc-gold' : 'text-ufc-red'
                          } mt-1 text-lg font-bold group-hover:scale-125 transition-transform`}
                      >
                        ✓
                      </span>
                      <span className="group-hover:text-white transition-colors">
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botones */}
              <div className="mt-10 pt-6 border-t border-ufc-black/50 space-y-3">
                <a
                  href="https://www.youtube.com/@ufc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-ufc-red hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 group"
                >
                  <Zap
                    size={18}
                    className="group-hover:scale-110 transition-transform"
                  />
                  Ver Highlights
                </a>
                <button className="w-full bg-ufc-dark hover:bg-ufc-black text-ufc-gray hover:text-white font-medium py-3 px-4 rounded-xl transition border border-ufc-gray/30 flex items-center justify-center gap-2">
                  <ShareIcon />
                  Compartir Perfil
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── COMPONENTES AUXILIARES ──────────────────────────────────────────
function StatRow({
  icon: Icon,
  label,
  value,
  isLegend,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  isLegend: boolean;
}) {
  return (
    <div className="flex justify-between items-center py-4 border-b border-ufc-black/50 last:border-0">
      <span className="text-ufc-gray flex items-center gap-3">
        <Icon
          size={18}
          className={isLegend ? 'text-ufc-gold' : 'text-ufc-red'}
        />
        {label}
      </span>
      <span className="text-white font-bold">{value}</span>
    </div>
  );
}

function ShareIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}