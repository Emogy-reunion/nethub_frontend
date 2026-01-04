/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // Proxy /api requests to your Flask backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',                // any request starting with /api
        destination: 'http://127.0.0.1:5000/api/:path*', // goes to Flask
      },
    ];
  },

};

export default nextConfig;
