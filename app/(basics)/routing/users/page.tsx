"use client";

import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

interface User {
    id: string;
    name: string;
    email: string;
    contact: string;
    address: string;
    type: string;
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch('/api/items')
            .then((res) => res.json())
            .then((data: User[]) => {
                setUsers(data);
                console.log(data.length);
            });
    }, []);

    return (
        <main className="container mx-auto">
            <h1 className="text-xl font-bold my-4 text-center">
                Users List
            </h1>
            <div>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>EMAIL</TableColumn>
                        <TableColumn>ADDRESS</TableColumn>
                        <TableColumn>CONTACT</TableColumn>
                        <TableColumn>TYPE</TableColumn>
                    </TableHeader>
                    {(!Array.isArray(users) || users.length === 0) ? (
                        <TableBody emptyContent={"No record to display!"}>{[]}</TableBody>
                    ) : (
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.contact}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
                </Table>
            </div>
        </main>
    );
}

export default Users;
