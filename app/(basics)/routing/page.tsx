"use client";
import { Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { IoIosLink } from 'react-icons/io';

export default function Routing() {
    const router = useRouter();

    return (
        <main className="flex flex-col items-center justify-cente px-4 py-8">
            <h1 className="md:text-2xl text-xl mb-8">Welcome to Next.js Routing!</h1>
            <div className="flex flex-row items-center space-x-4">
                <Link onClick={() => router.push('/routing/posts')} isBlock showAnchorIcon color="primary" anchorIcon={<IoIosLink className='ml-1' />} className='cursor-pointer'>
                    <div>View Posts</div>
                </Link>
                <Link onClick={() => router.push('/routing/about')} isBlock showAnchorIcon color="primary" anchorIcon={<IoIosLink className='ml-1' />} className='cursor-pointer'>
                    <div>About</div>
                </Link>
                <Link onClick={() => router.push('/routing/home')} isBlock showAnchorIcon color="primary" anchorIcon={<IoIosLink className='ml-1' />} className='cursor-pointer'>
                    <div>Home</div>
                </Link>
            </div>
        </main>
    );
}