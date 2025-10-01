/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
// next.config.js
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://maps.gstatic.com;
      connect-src 'self' https://maps.googleapis.com https://maps.gstatic.com;
      img-src 'self' data: https://*.googleapis.com https://*.gstatic.com https://maps.gstatic.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://maps.gstatic.com;
      font-src 'self' https://fonts.gstatic.com https://maps.gstatic.com;
      frame-src https://*.google.com;
    `.replace(/\s{2,}/g, ' ').trim(),
  },
];

module.exports = {
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};
