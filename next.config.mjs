/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/routing/home',
                destination: '/',
                permanent: true,
            },
            {
                source: '/data-fetching/home',
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
    },
    reactStrictMode: true,
};

export default nextConfig;