// app/layout.tsx
import Header from '@/components/Header';

export const metadata = {
    title: 'Next.js Routing Demo',
    description: 'Exploring Next.js 14 routing features',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Header />
            <main className="flex flex-col items-center justify-center">
                {children}
            </main>
        </div>
    );
}
