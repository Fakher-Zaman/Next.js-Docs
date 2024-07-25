import React from 'react';

type Navbar_Menu = {
    title: string;
    path: string;
}

export const Navbar_Menu: Navbar_Menu[] = [
    {
        title: "Basics",
        path: "/",
    },
    {
        title: "Standard",
        path: "/standard",
    },
    {
        title: "Advance",
        path: "/advance",
    },
];