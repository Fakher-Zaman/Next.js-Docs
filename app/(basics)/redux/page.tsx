"use client";

import React from 'react';
import { Switch, cn } from "@nextui-org/react";
import { isDark, isLight } from "@/store/features/mode-slice";
import { useDarkMode } from "usehooks-ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@/store/features/store';

const Redux = () => {
    const { isDarkMode, toggle, enable, disable } = useDarkMode();
    const mode = useSelector((state: RootState) => state.modeReducer.mode);
    const dispatch = useDispatch();

    const darkMode = (e: any) => {
        if (e.target.checked) {
            localStorage.setItem("mode", "dark");
            dispatch(isDark("dark"));
            enable();
        } else {
            localStorage.setItem("mode", "light");
            dispatch(isLight("light"));
            disable();
        }
    };
    return (
        <div>
            <Switch
                onChange={darkMode.bind(this)}
                isSelected={mode === 'dark'}
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
                        //selected
                        "group-data-[selected=true]:ml-6",
                        // pressed
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
    )
}

export default Redux;