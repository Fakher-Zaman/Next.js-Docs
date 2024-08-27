"use client";
import { Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { IoIosLink } from 'react-icons/io';

export default function DataFetching() {
    const router = useRouter();

    return (
        <main className="flex flex-col items-center justify-cente px-4 py-8">
            <h1 className="md:text-2xl text-xl mb-8">Welcome to Next.js Data Fetching!</h1>
            <div className="flex flex-row items-center space-x-4 flex-wrap justify-center">
                <Link onClick={() => router.push('/data-fetching/about')} isBlock showAnchorIcon color="primary" anchorIcon={<IoIosLink className='ml-1' />} className='cursor-pointer'>
                    <div>About</div>
                </Link>
                <Link onClick={() => router.push('/data-fetching/client-fetching')} isBlock showAnchorIcon color="primary" anchorIcon={<IoIosLink className='ml-1' />} className='cursor-pointer'>
                    <div>Client Fetching</div>
                </Link>
                <Link onClick={() => router.push('/data-fetching/server-fetching')} isBlock showAnchorIcon color="primary" anchorIcon={<IoIosLink className='ml-1' />} className='cursor-pointer'>
                    <div>Server Fetching</div>
                </Link>
                <Link onClick={() => router.push('/data-fetching/home')} isBlock showAnchorIcon color="primary" anchorIcon={<IoIosLink className='ml-1' />} className='cursor-pointer'>
                    <div>Home</div>
                </Link>
            </div>
        </main>
    );
}