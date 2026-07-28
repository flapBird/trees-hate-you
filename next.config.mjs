/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy-Report-Only",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.highperformanceformat.com",
              "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com",
              "img-src 'self' data: blob: https:",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data:",
              "frame-src https://nealfun.app https://www.highperformanceformat.com",
              "worker-src 'self' blob:",
              "media-src 'self' blob: https://nealfun.app",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests"
            ].join("; ")
          },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value:
              'camera=(), microphone=(), geolocation=(), payment=(), usb=(), fullscreen=(self "https://nealfun.app"), gamepad=(self "https://nealfun.app")'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
