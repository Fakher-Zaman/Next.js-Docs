"use client";

import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

export default function TabsComponent() {
    const router = useRouter();
    const pathname = usePathname();

    const items = [
        { key: "useState", title: "useState", path: "useState" },
        { key: "useEffect", title: "useEffect", path: "useEffect" },
        { key: "useContext", title: "useContext", path: "useContext" },
        { key: "useRef", title: "useRef", path: "useRef" },
        { key: "useReducer", title: "useReducer", path: "useReducer" },
        { key: "useCallback", title: "useCallback", path: "useCallback" },
        { key: "useMemo", title: "useMemo", path: "useMemo" },
        { key: "customHooks", title: "customHooks", path: "customHooks" },
    ];

    // Function to handle tab change based on path
    const handleTabChange = (path: string) => {
        return router.replace(`/hooks/${path}/`);
    };

    // Find the selected tab based on the current pathname
    const selectedTab = items.find((item) => pathname.includes(item.path));

    return (
        <>
            <div className="flex justify-between">
                <div className="flex items-center">
                    <span className="md:block hidden text-2xl cursor-pointer">
                        <IoMdArrowBack onClick={() => router.back()} />
                    </span>
                    <h2 className="text-2xl md:ml-5">BASICS : React Hooks</h2>
                </div>
            </div>
            <div className="flex w-full flex-col my-6 justify-center items-center">
                <Tabs
                    aria-label="Options"
                    color="primary"
                    variant="underlined"
                    selectedKey={selectedTab ? selectedTab.key : ""}
                    classNames={{
                        tabList:
                            "gap-8 w-full relative rounded-none p-0 border-b border-divider",
                        cursor: "w-full bg-[#22d3ee]",
                        tab: "max-w-fit px-0 h-12",
                        tabContent: "group-data-[selected=true]:text-[#06b6d4]",
                    }}
                >
                    {items.map((item) => (
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
                    ))}
                </Tabs>
            </div>
        </>
    );
}
