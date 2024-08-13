import Header from '@/components/Header';

export const metadata = {
    title: 'Next.js Docs - Parallel Routing',
    description: 'Exploring Next.js 14 parallel routing features',
};

export default function RootLayout({
    children,
    admin,
    customer,
}: {
    children: React.ReactNode;
    admin: React.ReactNode;
    customer: React.ReactNode;
}) {
    return (
        <>
            <main className="flex flex-col items-center justify-center">
                {children}
                <div className='container'>
                    <div className='container card'>
                        {admin}
                    </div>
                    <div className='container card'>
                        {customer}
                    </div>
                </div>
            </main>
        </>
    );
}
