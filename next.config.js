/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  images: {
    domains: ['app.powerbi.com'],
    unoptimized: true
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://app.powerbi.com https://*.powerbi.com; script-src 'self' 'unsafe-inline' 'unsafe-eval';",
          },
        ],
      },
    ]
  },
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig
