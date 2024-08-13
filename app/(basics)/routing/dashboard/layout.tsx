"use client";

import React, { useEffect, useState } from 'react';
import { getModeStatus } from '@/lib/modeStatus';

// export const metadata = {
//     title: 'Next.js Docs - Parallel Routing',
//     description: 'Exploring Next.js 14 parallel routing features',
// };

export default function RootLayout({
    children,
    admin,
    customer,
}: {
    children: React.ReactNode;
    admin: React.ReactNode;
    customer: React.ReactNode;
}) {
    const [mode, setMode] = useState<'dark' | 'light'>('light');

    useEffect(() => {
        const currentMode = getModeStatus();
        setMode(currentMode);
    }, [mode]);

    return (
        <>
            <main className="flex flex-col items-center justify-center">
                {children}
                <div className='container'>
                    {mode === 'dark' ? (
                        <div className='container card'>
                            {admin}
                        </div>
                    ) : (
                        <div className='container card'>
                            {customer}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
