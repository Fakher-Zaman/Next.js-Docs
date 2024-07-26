"use client";

import React, { useEffect, useState } from 'react'
import { Inter } from "next/font/google";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/features/store';
const inter = Inter({ subsets: ["latin"] });

const BodyComponent = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const modeFromRedux = useSelector((state: RootState) => state.modeReducer.mode);
    const [mode, setMode] = useState<string | null>(null);
    useEffect(() => {
        const storeMode = localStorage.getItem('mode') || 'light';
        setMode(storeMode);
    }, []);
    useEffect(() => {
        if(modeFromRedux) {
            localStorage.setItem('mode', modeFromRedux);
            setMode(modeFromRedux)
        }
    }, [modeFromRedux]);
    const modeClass = mode === 'dark' ? 'dark' : '';
    return (
        <body className={`${inter.className} ${modeClass} text-foreground bg-background`}>
            {children}
        </body>
    )
}

export default BodyComponent