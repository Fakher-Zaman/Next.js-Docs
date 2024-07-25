"use client";

import React from "react";
import { useRouter } from 'next/navigation';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { RiNextjsFill } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";

const NavbarComponent = () => {
    const router = useRouter();

    return (
        <Navbar isBordered maxWidth="full" className="px-10">
            <NavbarContent justify="start">
                <NavbarBrand className="mr-4">
                    <RiNextjsFill className="text-3xl" />
                    <p className="hidden sm:block font-bold text-inherit ml-2">NEXT</p>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-6" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Basics
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" aria-current="page" color="secondary">
                        Standard
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Advance
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent as="div" className="items-center" justify="end">
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
            </NavbarContent>
        </Navbar>
    );
}

export default NavbarComponent;