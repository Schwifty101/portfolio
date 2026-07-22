/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['placeholder.svg'],
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: '/case-study/arco-law', destination: '/work/arco-law', permanent: true },
      { source: '/case-study/automated-pre-call-brief-generator', destination: '/work/pre-call-brief', permanent: true },
      { source: '/case-study/ai-google-ads-automation', destination: '/work/ad-ops-agent', permanent: true },
      { source: '/case-study/ai-voice-receptionist', destination: '/work/ai-voice-agent', permanent: true },
    ]
  },
}

export default nextConfig
