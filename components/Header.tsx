"use client";

import { Radio, RadioGroup, Tab, Tabs } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { IoMdArrowBack } from 'react-icons/io';

const items = [
    { key: 'about', title: 'About', path: 'about' },
    { key: 'posts', title: 'Posts', path: 'posts' },
    { key: 'dashboard', title: 'Dashboard', path: 'dashboard' },
    { key: 'photo-feed', title: 'Photo Feed', path: 'photo-feed' },
    { key: 'users', title: 'Users', path: 'users' },
    { key: 'home', title: 'Home', path: 'home' },
];

const Header = () => {
    const router = useRouter();
    const pathname: any = usePathname();

    const handleTabChange = (path: string) => {
        return router.replace(`/routing/${path}`);
    };

    const selectedTab = items.find((item) => pathname.includes(item.path));

    return (
        <header className=''>
            <nav className='container mx-auto flex md:justify-between items-center md:flex-row flex-col'>
                <div className='flex items-center gap-4'>
                    <span className='sm:block hidden text-2xl cursor-pointer'><IoMdArrowBack onClick={() => router.back()} /></span>
                    <Link href={"/routing"} className='text-xl font-bold'>
                        Next.js Routing
                    </Link>
                </div>
                <div className="flex flex-wrap gap-4">
                    <Tabs className='md:block hidden' key="light" variant="light" aria-label="Tabs variants" selectedKey={selectedTab ? selectedTab.key : ""}>
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
                    <RadioGroup
                        orientation="horizontal"
                        className="md:hidden block mt-10 radio-button"
                        value={selectedTab ? selectedTab.key : ""}
                    >
                        {items.map((item) => (
                            <Radio key={item.key} value={item.key} onSelect={() => handleTabChange(item.path)}>
                                <div className="flex items-center space-x-2" onClick={() => handleTabChange(item.path)}>
                                    <span>{item.title}</span>
                                </div>
                            </Radio>
                        ))}
                    </RadioGroup>
                </div>
            </nav>
        </header>
    );
}

export default Header;