"use client";

import React, { useEffect, useState } from 'react';
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, useDisclosure,
    Spinner, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem
} from "@nextui-org/react";
import { toast } from 'react-toastify';
import { BsThreeDotsVertical } from 'react-icons/bs';

// Update the User interface to match the response data structure
interface User {
    _id: string;
    userId: string;
    userName: string;
    userEmail: string;
    userContact: string;
    userAddress: string;
    userType: string;
}

const Users: React.FC = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [users, setUsers] = useState<User[]>([]);
    const [user, setSingleUser] = useState<User[]>([]);
    const [newUser, setNewUser] = useState<Omit<User, '_id'>>({
        userId: '',
        userName: '',
        userEmail: '',
        userContact: '',
        userAddress: '',
        userType: ''
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dataLoading, setDataLoading] = useState<boolean>(false);

    const notify = (message: string, type: "success" | "error" | "warning" = "success") => {
        toast[type](message);
    };

    const getUsers = () => {
        setIsLoading(true);
        fetch('/api/users', {
            method: 'GET',
            headers: {
                'X-Required-Header': 'customValue123'
            },
        })
            .then(async (res) => {
                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(errorText);
                }
                return res.json();
            })
            .then((data) => {
                setUsers(data.users || []);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
                notify(`Failed to fetch users: ${error.message}`, "error");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        getUsers();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const emptyFields = () => {
        setNewUser({
            userId: '',
            userName: '',
            userEmail: '',
            userContact: '',
            userAddress: '',
            userType: ''
        });
    };

    const handleAddUser = async () => {
        setDataLoading(true);
        try {
            const newUserWithId = {
                userId: Date.now().toString(),
                userName: newUser.userName,
                userEmail: newUser.userEmail,
                userContact: newUser.userContact,
                userAddress: newUser.userAddress,
                userType: newUser.userType
            };
            if (newUser.userName && newUser.userEmail && newUser.userContact && newUser.userAddress && newUser.userType) {
                const res = await fetch('/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Required-Header': 'customValue123',
                    },
                    body: JSON.stringify(newUserWithId),
                });
                if (res.ok) {
                    const { message, users: updatedUsers } = await res.json();
                    setUsers(updatedUsers);
                    notify(message, "success");
                    onOpenChange(); // Close modal
                    getUsers();
                } else {
                    const { message } = await res.json();
                    notify(message || "Failed to add user!", "error");
                }
            } else {
                notify("All fields are required!", "warning");
            }
        } catch (error) {
            console.error("Error adding user:", error);
            notify("An error occurred. Please try again!", "error");
        } finally {
            setDataLoading(false);
            emptyFields();
        }
    };

    const handleViewUser = (userId: string) => {
        try {
            fetch(`/api/users/${userId}`, {
                method: 'GET',
                headers: {
                    'X-Required-Header': 'customValue123'
                },
            })
                .then(async (res) => {
                    if (!res.ok) {
                        const errorText = await res.text();
                        throw new Error(errorText);
                    }
                    return res.json();
                })
                .then((data) => {
                    setSingleUser(data.user || []);
                    console.log("Fetched: ", data.user);
                })
                .catch((error) => {
                    console.error('Error fetching users:', error);
                    notify(`Failed to fetch users: ${error.message}`, "error");
                })
        } catch (error) {
            console.log("Error: ", error);
            notify(`Something went wrong: ${error}`, "error");
        }
    }

    return (
        <main className="container mx-auto">
            {isLoading ? (
                <div className='flex justify-center items-center p-4 mt-10'>
                    <Spinner />
                </div>
            ) : (
                <>
                    <div className='flex flex-row items-center gap-5 justify-center w-full'>
                        <h1 className="text-xl font-bold my-4 text-center">Users List</h1>
                        <Button onPress={onOpen} className='absolute right-16'>Add User</Button>
                    </div>
                    <div>
                        <Table aria-label="Users table">
                            <TableHeader>
                                <TableColumn>ID</TableColumn>
                                <TableColumn>NAME</TableColumn>
                                <TableColumn>EMAIL</TableColumn>
                                <TableColumn>ADDRESS</TableColumn>
                                <TableColumn>CONTACT</TableColumn>
                                <TableColumn>TYPE</TableColumn>
                                <TableColumn>Actions</TableColumn>
                            </TableHeader>
                            {(!Array.isArray(users) || users.length === 0) ? (
                                <TableBody emptyContent={"No record to display!"}>{[]}</TableBody>
                            ) : (
                                <TableBody>
                                    {users.map((user, index) => (
                                        <TableRow key={user.userId}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{user.userName}</TableCell>
                                            <TableCell>{user.userEmail}</TableCell>
                                            <TableCell>{user.userAddress}</TableCell>
                                            <TableCell>{user.userContact}</TableCell>
                                            <TableCell>
                                                <Chip className="capitalize" color="default" size="sm" variant="flat">
                                                    {user.userType}
                                                </Chip>
                                            </TableCell>
                                            <TableCell>
                                                <Dropdown>
                                                    <DropdownTrigger>
                                                        <Button isIconOnly size="sm" variant="light">
                                                            <BsThreeDotsVertical className="text-default-400 text-xl" />
                                                        </Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu>
                                                        <DropdownItem onPress={() => handleViewUser(user.userId)}>View</DropdownItem>
                                                        <DropdownItem>Edit</DropdownItem>
                                                        <DropdownItem>Delete</DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </TableCell>
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
                                            name="userName"
                                            label="Name"
                                            placeholder="Enter user name"
                                            value={newUser.userName}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            name="userEmail"
                                            label="Email"
                                            placeholder="Enter user email"
                                            value={newUser.userEmail}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            name="userContact"
                                            label="Contact"
                                            placeholder="Enter contact number"
                                            value={newUser.userContact}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            name="userAddress"
                                            label="Address"
                                            placeholder="Enter address"
                                            value={newUser.userAddress}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            name="userType"
                                            label="Type"
                                            placeholder="Enter user type"
                                            value={newUser.userType}
                                            onChange={handleInputChange}
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button
                                            isLoading={dataLoading}
                                            color="primary"
                                            onPress={handleAddUser}
                                            className='text-white'
                                            isDisabled={newUser.userName === '' || newUser.userEmail === '' || newUser.userContact === '' || newUser.userAddress === '' || newUser.userType === ''}
                                        >
                                            Add
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}
        </main>
    );
}

export default Users;