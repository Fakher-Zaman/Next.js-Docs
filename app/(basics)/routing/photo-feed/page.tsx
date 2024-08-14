// /pages/routing/photo-feed.js (or .jsx)
"use client"; // Ensure this is correct for your use case

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import wonders from './wonders';
import { Card, CardBody } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

const PhotoFeed = () => {
    const router = useRouter();

    return (
        <main className='container mx-auto'>
            <h1 className='text-xl font-bold mb-4 text-center'>
                New Wonders of the World
            </h1>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 w-full'>
                {wonders.map((wonder) => (
                    <Card className="bg-white dark:bg-gray-800 py-4 cursor-pointer" key={wonder.id} onClick={() => router.push(`/routing/photo-feed/${wonder.id}`, { scroll: false })} isHoverable isPressable>
                        <CardBody className="overflow-visible py-2">
                            <Image
                                alt={wonder.name}
                                src={wonder.src}
                                className="w-full object-cover aspect-square"
                                width={400}
                                height={400}
                            />
                        </CardBody>
                    </Card>
                ))}
            </div>
        </main>
    );
}

export default PhotoFeed;
