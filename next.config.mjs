/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              frame-ancestors 'self' https://www.youtube.com https://youtu.be;
            `
              .replace(/\n/g, "")
              .trim(),
          },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      // YouTube
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },

      // Wikimedia
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },

      // UFC
      {
        protocol: "https",
        hostname: "www.ufcespanol.com",
      },

      // ESPN
      {
        protocol: "https",
        hostname: "a.espncdn.com",
      },
      {
        protocol: "https",
        hostname: "www.espn.com",
      },

      // Pinterest
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "s.pinimg.com",
      },

      // Otros
      {
        protocol: "https",
        hostname: "www.fightsports.tv",
      },
      {
        protocol: "https",
        hostname: "st1.uvnimg.com",
      },
      {
        protocol: "https",
        hostname: "static.foxdeportes.com",
      },
      {
        protocol: "https",
        hostname: "trome.com",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
    ],
  },
};

export default nextConfig;