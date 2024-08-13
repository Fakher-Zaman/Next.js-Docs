"use client";

import { Button } from '@nextui-org/button';
import { Avatar, Card, CardHeader } from '@nextui-org/react';
import React, { useContext, useState, createContext } from 'react';

interface User {
    name: string;
    image: string;
    color: "primary" | "default" | "secondary" | "success" | "warning" | "danger";
    age: number;
}

const initialUser: User = {
    name: "Jesse Hall",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    color: "primary",
    age: 25
};

const UserContext = createContext<User>(initialUser);

const useContextHook = () => {
    const [user, setUser] = useState<User>(initialUser);

    function changeUser() {
        const users: User[] = [
            {
                name: "John Doe",
                image: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
                color: "default",
                age: 30
            },
            {
                name: "Jane Doe",
                image: "https://i.pravatar.cc/150?u=a04258114e29026708c",
                color: "secondary",
                age: 35
            },
            {
                name: "Jos Peter",
                image: "https://i.pravatar.cc/150?u=a04258114e29026302d",
                color: "success",
                age: 20
            },
            {
                name: "Jayla Cena",
                image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                color: "warning",
                age: 28
            },
            {
                name: "Jasmine Brown",
                image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
                color: "danger",
                age: 32
            },
        ];

        const randomUser = users[Math.floor(Math.random() * users.length)];
        setUser(randomUser);
    }

    return (
        <UserContext.Provider value={user}>
            <section className='flex flex-col justify-center items-center gap-5'>
                <Component2 />
                <Button variant='light' color='primary' onClick={changeUser}>Change User</Button>
            </section>
        </UserContext.Provider>
    )
}

export default useContextHook;

const Component2 = () => {
    return (
        <Component3 />
    )
}

const Component3 = () => {
    return (
        <Component4 />
    )
}

const Component4 = () => {
    const user = useContext(UserContext);
    return (
        <Card shadow='sm' fullWidth className='bg-white dark:bg-gray-800 p-6 mt-3'>
            <aside className='flex flex-row justify-center items-center gap-5'>
                <Avatar isBordered color={user.color} src={user.image} className='w-12 h-12' />
                <div>
                    <p className="text-xl font-semibold">{user.name}</p>
                    <p className="text-sm font-normal">Age: {user.age}</p>
                </div>
            </aside>
        </Card>
    )
}