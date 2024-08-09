"use client";

import { Tab, Tabs } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { IoMdArrowBack } from 'react-icons/io';

const items = [
    { key: 'posts', title: 'Posts', path: 'posts' },
    { key: 'about', title: 'About', path: 'about' },
    { key: 'contact', title: 'Contact', path: 'contact' },
]

const Header = () => {
    const router = useRouter();
    const pathname: any = usePathname();

    const handleTabChange = (path: string) => {
        return router.replace(`/routing/${path}`);
    };

    const selectedTab = items.find((item) => pathname.includes(item.path));

    return (
        <header className=''>
            <nav className='container mx-auto flex justify-between items-center'>
                <div className='flex items-center gap-4'>
                    <span className='sm:block hidden text-2xl cursor-pointer'><IoMdArrowBack onClick={() => router.back()} /></span>
                    <Link href={"/routing"} className='text-xl font-bold'>
                        Next.js Routing
                    </Link>
                </div>
                <div className="flex flex-wrap gap-4">
                    <Tabs key="light" variant="light" aria-label="Tabs variants" selectedKey={selectedTab ? selectedTab.key : ""}>
                        {
                            items.map((item) => (
                                <Tab
                                    key={item.key}
                                    title={
                                        <div className="flex items-center space-x-2" onClick={() => handleTabChange(item.path)}>
                                            <span>{item.title}</span>
                                        </div>
                                    }
                                    value={item.key}
                                    onSelect={() => handleTabChange(item.path)}
                                />
                            ))
                        }
                    </Tabs>
                </div>
            </nav>
        </header>
    );
}

export default Header;