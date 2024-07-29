"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoMdArrowBack } from 'react-icons/io';

const Hooks = () => {
    const router = useRouter();

    return (
        <>
            {/* <nav className="m-5 flex justify-between items-center">
                <Link href="/useState" className="pointer px-4 py-2 rounded m-2 bg-primary-50">useState</Link>
                <Link href="/useEffect" className="pointer px-4 py-2 rounded m-2 bg-primary-100">useEffect</Link>
                <Link href="/useContext" className="pointer px-4 py-2 rounded m-2 bg-primary-200">useContext</Link>
                <Link href="/useRef" className="pointer px-4 py-2 rounded m-2 bg-primary-300">useRef</Link>
                <Link href="/useReducer" className="pointer px-4 py-2 rounded m-2 bg-primary-400 text-[white]">useReducer</Link>
                <Link href="/useCallback" className="pointer px-4 py-2 rounded m-2 bg-primary-500 text-[white]">useCallback</Link>
                <Link href="/useMemo" className="pointer px-4 py-2 rounded m-2 bg-primary-600 text-[white]">useMemo</Link>
                <Link href="/customHook" className="pointer px-4 py-2 rounded m-2 bg-primary-700 text-[white]">customHooks</Link>
            </nav> */}
            <div>
                React Hooks Page
            </div>
        </>
    )
}

export default Hooks;