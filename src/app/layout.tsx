// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// =========================================
// CONFIGURACIÓN DE METADATA (SEO)
// =========================================
export const metadata: Metadata = {
  title: {
    default: "UFC Fan | Tu pasión por las artes marciales mixtas",
    template: "%s | UFC Fan",
  },
  description:
    "Explora el mundo del UFC y MMA: luchadores, eventos, historia, técnicas y noticias. La comunidad definitiva para fans de las artes marciales mixtas.",

  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://ufcfan.com.co",
    siteName: "UFC Fan",
    title: "UFC Fan | Tu pasión por las artes marciales mixtas",
    description:
      "Explora el mundo del UFC y MMA: luchadores, eventos, historia y noticias.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "UFC Fan - Portal de MMA",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "UFC Fan | Tu pasión por las artes marciales mixtas",
    description: "Explora el mundo del UFC y MMA: luchadores, eventos, historia y noticias.",
    images: ["/twitter-image.jpg"],
    creator: "@ufcfan",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  keywords: ["UFC", "MMA", "artes marciales", "luchadores", "eventos", "octágono", "combate", "deportes"],
  authors: [{ name: "UFC Fan Team" }],

  alternates: {
    canonical: "https://ufcfan.com.co",
  },

  category: "sports",
  classification: "Deportes y Entretenimiento",
};

// =========================================
// CONFIGURACIÓN DE VIEWPORT
// =========================================
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#d20a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

// =========================================
// STRUCTURED DATA (JSON-LD)
// =========================================
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: "UFC Fan",
  alternateName: "UFC Passion Colombia",
  url: "https://ufcfan.com.co",
  logo: "https://ufcfan.com.co/logo.png",
  description: "Portal dedicado a los fans de UFC y artes marciales mixtas en Colombia",
  foundingDate: "2024",
  areaServed: {
    "@type": "Country",
    name: "Colombia",
  },
  sameAs: ["https://twitter.com/ufcfan", "https://instagram.com/ufcfan", "https://facebook.com/ufcfan"],
};

// =========================================
// COMPONENTE SCROLL REVEAL (LAZY LOAD)
// =========================================
const ScrollReveal = dynamic(
  () => import("./components/ScrollReveal"),
  { 
    ssr: false,
    loading: () => null // No mostrar nada mientras carga
  }
);

// =========================================
// COMPONENTE PRINCIPAL
// =========================================
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* Preconnect para recursos externos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />

        {/* DNS Prefetch para dominios de imágenes */}
        <link rel="dns-prefetch" href="https://trome.com" />
        <link rel="dns-prefetch" href="https://static.foxdeportes.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className="antialiased flex flex-col min-h-screen bg-ufc-black text-white selection:bg-ufc-red selection:text-white">
        {/* Skip Link para accesibilidad */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-ufc-red focus:text-white focus:rounded-lg focus:font-semibold transition-all"
        >
          Saltar al contenido principal
        </a>

        {/* ScrollReveal (carga solo en cliente, mejora el rendimiento inicial) */}
        <ScrollReveal />

        {/* Navbar */}
        <Navbar />

        {/* 
          ✅ CONTENIDO PRINCIPAL - Padding dinámico:
          - Home (/) : pt-0 (el hero maneja su propio posicionamiento con -mt)
          - Otras páginas: pt-20 mobile / pt-[128px] desktop (compensa navbar completo)
          Se ha añadido animación de fade-in suave para mejorar la experiencia visual
        */}
        <main
          id="main-content"
          className="flex-grow pt-0 animate-fadeIn" // Clase simplificada y animación añadida
          role="main"
          aria-label="Contenido principal"
        >
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Overlay de carga global (opcional) */}
        <div
          id="global-loader"
          className="fixed inset-0 bg-ufc-black/90 backdrop-blur-sm z-[100] hidden items-center justify-center"
          aria-hidden="true"
        >
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-ufc-red border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-ufc-gray text-sm">Cargando...</p>
          </div>
        </div>
      </body>
    </html>
  );
}