"use client";

import React from "react";
import { useRouter, usePathname } from 'next/navigation';
import { Navbar, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Switch } from "@nextui-org/react";
import { RiNextjsFill } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { Navbar_Menu } from "./Constants";
import { isDark, isLight } from "@/store/features/mode-slice";
import { useDarkMode } from "usehooks-ts";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/features/store";

const NavbarComponent = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const { isDarkMode, toggle, enable, disable } = useDarkMode();
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
        }
    }

    const activeLink = (path: string) => {
        return path === pathname ? "primary" : "foreground";
    }

    return (
        <Navbar isBordered maxWidth="full" className="md:px-10" onMenuOpenChange={setIsMenuOpen}>
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
                <Switch
                    onChange={darkMode.bind(this)}
                    isSelected={mode === 'dark'}
                    defaultSelected
                    size="sm"
                    color="primary"
                    startContent={<BiSolidSun />}
                    endContent={<BiSolidMoon />}
                >
                    {mode === 'dark' ? 'Dark mode' : 'Light mode'}
                </Switch>
                <Input
                    classNames={{
                        base: "max-w-full sm:max-w-[15rem] h-10",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    placeholder="Type to search..."
                    size="sm"
                    startContent={<IoSearchSharp />}
                    type="search"
                />
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
            </NavbarContent>
            <NavbarMenu>
                {Navbar_Menu.map((menu, index) => (
                    <NavbarMenuItem key={index}>
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