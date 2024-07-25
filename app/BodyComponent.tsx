import React from 'react'
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const BodyComponent = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <body className={inter.className}>{children}</body>
    )
}

export default BodyComponent