"use client";

import { Radio, RadioGroup, Tab, Tabs } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';

const items = [
    { key: 'about', title: 'About', path: 'about' },
    { key: 'client-fetching', title: 'Client Fetching', path: 'client-fetching' },
    { key: 'server-fetching', title: 'Server Fetching', path: 'server-fetching' },
    { key: 'home', title: 'Home', path: 'home' },
];

const FetchingHeader = () => {
    const router = useRouter();
    const pathname: any = usePathname();
    const [selectedTab, setSelectedTab] = useState<string>("");

    useEffect(() => {
        if (pathname === '/data-fetching') {
            setSelectedTab("");
        } else {
            const tab = items.find((item) => pathname.includes(item.path));
            setSelectedTab(tab ? tab.key : "");
        }
    }, [pathname]);

    const handleTabChange = (path: string) => {
        return router.replace(`/data-fetching/${path}`);
    };

    return (
        <header className=''>
            <nav className='container mx-auto flex md:justify-between items-center md:flex-row flex-col'>
                <div className='flex items-center gap-4'>
                    <span className='sm:block hidden text-2xl cursor-pointer'><IoMdArrowBack onClick={() => router.back()} /></span>
                    <Link href={"/data-fetching"} className='text-xl font-bold'>
                        Next.js Data Fetching
                    </Link>
                </div>
                <div className="flex flex-wrap gap-4">
                    <Tabs className='md:block hidden' key="light" variant="light" aria-label="Tabs variants" selectedKey={selectedTab}>
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
                        value={selectedTab}
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

export default FetchingHeader;