"use client";

import React, { useEffect, useState } from 'react';
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, useDisclosure
} from "@nextui-org/react";
import { toast } from 'react-toastify';

interface User {
    id: string;
    name: string;
    email: string;
    contact: string;
    address: string;
    type: string;
}

const Users: React.FC = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState<Omit<User, 'id'>>({
        name: '',
        email: '',
        contact: '',
        address: '',
        type: ''
    });

    const notify = (message: string, type: "success" | "error" = "success") => {
        toast[type](message);
    };

    useEffect(() => {
        fetch('/api/items')
            .then((res) => res.json())
            .then((data: User[]) => {
                setUsers(data);
                console.log(data.length);
            });
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleAddUser = async () => {
        try {
            // Create a new user object with the expected API fields
            const newUserWithId = {
                userId: Date.now().toString(), // Generate a unique ID
                userName: newUser.name,
                userEmail: newUser.email,
                userContact: newUser.contact,
                userAddress: newUser.address,
                userType: newUser.type
            };

            const res = await fetch('/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUserWithId),
            });

            if (res.ok) {
                const { message, users: updatedUsers } = await res.json();
                setUsers(updatedUsers); // Update the users state with the latest list
                notify(message, "success");
                onOpenChange(); // Close modal
            } else {
                const { message } = await res.json();
                notify(message || "Failed to add user!", "error");
            }
        } catch (error) {
            console.error("Error adding user:", error);
            notify("An error occurred. Please try again!", "error");
        }
    };

    return (
        <main className="container mx-auto">
            <div className='flex flex-row items-center gap-5 justify-between'>
                <h1 className="text-xl font-bold my-4 text-center">Users List</h1>
                <Button onPress={onOpen}>Add User</Button>
            </div>
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
                                    <TableCell>{user.address}</TableCell>
                                    <TableCell>{user.contact}</TableCell>
                                    <TableCell>{user.type}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
                </Table>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add User</ModalHeader>
                            <ModalBody>
                                <Input
                                    name="name"
                                    label="Name"
                                    placeholder="Enter user name"
                                    value={newUser.name}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    name="email"
                                    label="Email"
                                    placeholder="Enter user email"
                                    value={newUser.email}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    name="contact"
                                    label="Contact"
                                    placeholder="Enter contact number"
                                    value={newUser.contact}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    name="address"
                                    label="Address"
                                    placeholder="Enter address"
                                    value={newUser.address}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    name="type"
                                    label="Type"
                                    placeholder="Enter user type"
                                    value={newUser.type}
                                    onChange={handleInputChange}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={handleAddUser} className='text-white'>
                                    Add
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </main>
    );
}

export default Users;