// app/layout.tsx
import FetchingHeader from '@/components/FetchingHeader';
import Header from '@/components/Header';

export const metadata = {
    title: 'Next.js Data Fetching',
    description: 'Exploring Next.js 14 routing features',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <FetchingHeader />
            <main className="flex flex-col items-center justify-center">
                {children}
            </main>
        </div>
    );
}
