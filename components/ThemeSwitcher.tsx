import React, { useEffect, useState } from "react";
import { VisuallyHidden, useSwitch } from "@nextui-org/react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

const ThemeSwitcher = ({ isSelected, onChange }: { isSelected: boolean; onChange: any }) => {
    const [mode, setMode] = useState<string | null>(null);

    const {
        Component,
        slots,
        getBaseProps,
        getInputProps,
        getWrapperProps,
    } = useSwitch({ isSelected: mode === 'dark', onChange });

    useEffect(() => {
        // Get the mode from localStorage when the component mounts
        const storedMode = localStorage.getItem('mode');
        if (storedMode) {
            setMode(storedMode);
        }
    }, [isSelected]);

    return (
        <div className="flex flex-col gap-2">
            <Component {...getBaseProps()} size='sm'>
                <VisuallyHidden>
                    <input {...getInputProps()} />
                </VisuallyHidden>
                <div
                    {...getWrapperProps()}
                    className={slots.wrapper({
                        class: [
                            "w-7 h-7",
                            "flex items-center justify-center",
                            "rounded-lg bg-default-100 hover:bg-default-200",
                        ],
                    })}
                >
                    {mode === 'dark' ? (
                        <IoMdSunny className="text-white" />
                    ) : (
                        <IoMdMoon />
                    )}
                </div>
            </Component>
        </div>
    );
};

export default ThemeSwitcher;
