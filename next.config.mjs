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
};

export default nextConfig;
