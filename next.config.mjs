/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "frame-ancestors 'self' https://www.youtube.com https://youtu.be;",
        },
      ],
    },
  ],
  images: {
    remotePatterns: [
      // ─── YouTube (miniaturas) ───────────────────────────────────
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },

      // ─── Wikimedia Commons ──────────────────────────────────────
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },

      // ─── UFC Español (imágenes oficiales) ───────────────────────
      {
        protocol: 'https',
        hostname: 'www.ufcespanol.com',
        pathname: '/images/**',
      },

      // ─── ESPN (imágenes de luchadores) ──────────────────────────
      {
        protocol: 'https',
        hostname: 'a.espncdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.espn.com',
        pathname: '/**',
      },

      // ─── Pinterest ──────────────────────────────────────────────
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's.pinimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pinterest.com',
        pathname: '/**',
      },

      // ─── Otros dominios ─────────────────────────────────────────
      {
        protocol: 'https',
        hostname: 'www.fightsports.tv',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'st1.uvnimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.foxdeportes.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'trome.com',
        pathname: '/**',
      },
          {
      protocol: 'https',
      hostname: 'flagcdn.com',
      pathname: '/**',
    },
    ],
  },
};

export default nextConfig;