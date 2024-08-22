/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/routing/home',
                destination: '/',
                permanent: true,
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fakher-zaman.github.io',
                port: '',
                pathname: '/Image-Resources/**',
            },
        ],
        loader: 'akamai',
        path: '',
    },
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
    compress: true,
    experimental: {
        reactRoot: true,
        scrollRestoration: true,
    },
    distDir: 'build',
};

export default nextConfig;
