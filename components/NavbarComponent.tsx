"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from 'next/navigation';
import {
    Navbar,
    NavbarContent,
    NavbarItem,
    Link,
    Input,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
} from "@nextui-org/react";
import { RiNextjsFill } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { Navbar_Menu } from "./Constants";
import { isDark, isLight } from "@/store/features/mode-slice";
import { useDarkMode } from "usehooks-ts";
import { BiExitFullscreen } from "react-icons/bi";
import { MdFullscreen } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/features/store";
import ThemeSwitcher from "./ThemeSwitcher";

const NavbarComponent = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname: any = usePathname();
    const { enable, disable } = useDarkMode();
    const [isFullscreen, setIsFullscreen] = useState(false);
    const mode = useSelector((state: RootState) => state.modeReducer.mode);

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

    const handleLinks = (path: string) => {
        return () => {
            router.push(path);
            setIsMenuOpen(false);
        }
    }

    const activeLink = (path: string) => {
        return path === pathname ? "primary" : "foreground";
    }

    const handleFullscreen = () => {
        const element: any = document.documentElement;
        const cancel: any = document;
        if (!isFullscreen) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
            setIsFullscreen(true);
        } else {
            if (cancel.exitFullscreen) {
                cancel.exitFullscreen();
            } else if (cancel.mozCancelFullScreen) {
                cancel.mozCancelFullScreen();
            } else if (cancel.webkitExitFullscreen) {
                cancel.webkitExitFullscreen();
            } else if (cancel.msExitFullscreen) {
                cancel.msExitFullscreen();
            }
            setIsFullscreen(false);
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
        document.addEventListener("mozfullscreenchange", handleFullscreenChange);
        document.addEventListener("MSFullscreenChange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
            document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
            document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
        };
    }, []);

    const handleMenuToggle = (isOpen: boolean) => {
        setIsMenuOpen(isOpen);
    };

    return (
        <Navbar
            isBordered
            maxWidth="full"
            className="md:px-10"
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={handleMenuToggle}
        >
            <NavbarContent justify="start">
                <NavbarItem className="mr-4 flex items-center justify-center">
                    <RiNextjsFill className="text-3xl" />
                    <p className="hidden sm:block font-bold text-inherit ml-2">NEXT.js</p>
                </NavbarItem>
                <NavbarContent className="hidden sm:flex gap-6">
                    {
                        Navbar_Menu.map((menu, index) => (
                            <NavbarItem key={index}>
                                <Link color={activeLink(menu.path)} onClick={handleLinks(menu.path)} className="cursor-pointer">
                                    {menu.title}
                                </Link>
                            </NavbarItem>
                        ))
                    }
                </NavbarContent>
            </NavbarContent>
            <NavbarContent as="div" className="items-center" justify="end">
                <NavbarItem className="-mr-2">
                    <ThemeSwitcher
                        isSelected={mode === "dark"}
                        onChange={darkMode.bind(this)}
                    />
                </NavbarItem>
                <NavbarItem>
                    {isFullscreen ? (
                        <BiExitFullscreen onClick={handleFullscreen} className="text-[26px] cursor-pointer" />
                    ) : (
                        <MdFullscreen onClick={handleFullscreen} className="text-[26px] cursor-pointer" />
                    )}
                </NavbarItem>
                <Input
                    classNames={{
                        base: "max-w-full sm:max-w-[15rem] h-10",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    className="hidden sm:block"
                    placeholder="Type to search..."
                    size="sm"
                    startContent={<IoSearchSharp />}
                    type="search"
                />
                <NavbarMenuToggle
                    data-selected={isMenuOpen}
                    onChange={handleMenuToggle}
                    className="sm:hidden"
                />
            </NavbarContent>
            <NavbarMenu
                motionProps={{ initial: false, animate: true, transition: { duration: 0.3 } }}
            >
                {Navbar_Menu.map((menu, index) => (
                    <NavbarMenuItem key={index} onSelect={() => setIsMenuOpen(false)}>
                        <Link color={activeLink(menu.path)} onClick={handleLinks(menu.path)} className="cursor-pointer">
                            {menu.title}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}

export default NavbarComponent;
