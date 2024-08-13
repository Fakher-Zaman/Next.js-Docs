"use client";

import React, { useEffect, useState } from 'react';
import { Switch, cn } from "@nextui-org/react";
import { isDark, isLight } from "@/store/features/mode-slice";
import { useDarkMode } from "usehooks-ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@/store/features/store';
import { IoMdArrowBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';

const Redux = () => {
    const { isDarkMode, toggle, enable, disable } = useDarkMode();
    const mode = useSelector((state: RootState) => state.modeReducer.mode);
    const dispatch = useDispatch();
    const router = useRouter();
    const [modeState, setModeState] = useState('');

    useEffect(() => {
        const savedMode = localStorage.getItem("mode");
        if (savedMode === "dark") {
            dispatch(isDark("dark"));
            setModeState('dark');
            enable();
        } else {
            dispatch(isLight("light"));
            setModeState('light');
            disable();
        }
    }, [dispatch, enable, disable]);

    const darkMode = (e: any) => {
        if (e.target.checked) {
            localStorage.setItem("mode", "dark");
            dispatch(isDark("dark"));
            setModeState('dark');
            enable();
        } else {
            localStorage.setItem("mode", "light");
            dispatch(isLight("light"));
            setModeState('light');
            disable();
        }
    };

    return (
        <div>
            <div className='flex justify-between'>
                <div className='flex items-center'>
                    <span className='sm:block hidden text-2xl cursor-pointer'><IoMdArrowBack onClick={() => router.back()} /></span>
                    <h2 className='text-2xl md:ml-5'>BASICS : Redux</h2>
                </div>
            </div>
            <div className='flex justify-center items-center my-6'>
                <Switch
                    onChange={darkMode}
                    isSelected={modeState === 'dark' ? true : false}
                    defaultSelected
                    classNames={{
                        base: cn(
                            "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                            "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                            "data-[selected=true]:border-primary",
                        ),
                        wrapper: "p-0 h-4 overflow-visible",
                        thumb: cn("w-6 h-6 border-2 shadow-lg",
                            "group-data-[hover=true]:border-primary",
                            "group-data-[selected=true]:ml-6",
                            "group-data-[pressed=true]:w-7",
                            "group-data-[selected]:group-data-[pressed]:ml-4",
                        ),
                    }}
                >
                    <div className="flex flex-col gap-1">
                        <p className="text-medium">Enable early access</p>
                        <p className="text-tiny text-default-400">
                            Get access to new features before they are released.
                        </p>
                    </div>
                </Switch>
            </div>
        </div>
    )
}

export default Redux;