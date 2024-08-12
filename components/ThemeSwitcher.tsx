import React from "react";
import { VisuallyHidden, useSwitch } from "@nextui-org/react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

const ThemeSwitcher = ({ isSelected, onChange }: { isSelected: boolean; onChange: any }) => {
    const {
        Component,
        slots,
        getBaseProps,
        getInputProps,
        getWrapperProps,
    } = useSwitch({ isSelected, onChange });

    return (
        <div className="flex flex-col gap-2">
            <Component {...getBaseProps()} size='sm'>
                <VisuallyHidden>
                    {/* Ensure `isSelected` is not passed to the DOM directly */}
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
                    {isSelected ? <IoMdSunny className="text-white" /> : <IoMdMoon />}
                </div>
            </Component>
        </div>
    );
};

export default ThemeSwitcher;
