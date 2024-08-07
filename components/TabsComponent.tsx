"use client";

import React from "react";
import { Tabs, Tab, RadioGroup, Radio } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

export default function TabsComponent() {
    const router = useRouter();
    const pathname: any = usePathname();

    const items = [
        { key: "useState", title: "useState", path: "useState" },
        { key: "useEffect", title: "useEffect", path: "useEffect" },
        { key: "useContext", title: "useContext", path: "useContext" },
        { key: "useRef", title: "useRef", path: "useRef" },
        { key: "useReducer", title: "useReducer", path: "useReducer" },
        { key: "useCallback", title: "useCallback", path: "useCallback" },
        { key: "useMemo", title: "useMemo", path: "useMemo" },
        { key: "customHook", title: "customHook", path: "customHook" },
    ];

    const handleTabChange = (path: string) => {
        return router.replace(`/hooks/${path}/`);
    };

    const selectedTab = items.find((item) => pathname.includes(item.path));

    return (
        <>
            <div className="flex justify-between">
                <div className="flex items-center">
                    <span className="sm:block hidden text-2xl cursor-pointer">
                        <IoMdArrowBack onClick={() => router.back()} />
                    </span>
                    <h2 className="text-2xl sm:ml-5">BASICS : React Hooks</h2>
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
                    className="md:block hidden"
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
                <RadioGroup
                    orientation="horizontal"
                    className="md:hidden block mt-0"
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
        </>
    );
}
