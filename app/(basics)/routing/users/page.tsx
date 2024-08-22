"use client";

import React, { useEffect, useState } from 'react';
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, useDisclosure,
    Spinner, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem
} from "@nextui-org/react";
import { toast } from 'react-toastify';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaHome, FaMobileAlt, FaUser } from 'react-icons/fa';
import { RiShieldUserFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';

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
    const [singleUser, setSingleUser] = useState<Omit<User, '_id'>>({
        userId: '',
        userName: '',
        userEmail: '',
        userContact: '',
        userAddress: '',
        userType: ''
    });
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
    const [isViewModal, setIsViewModal] = useState<boolean>(false);
    const [isAddModal, setIsAddModal] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>('');

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

    const openAddModal = () => {
        setIsAddModal(true);
    }

    const closeAddModal = () => {
        setIsAddModal(false);
    }

    const openViewModal = (user: User) => {
        setUserId(userId);
        setSingleUser(user);
        setIsViewModal(true);
    }

    const closeViewModal = () => {
        setIsViewModal(false);
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
                        <Button onPress={openAddModal} className='absolute right-16'>Add User</Button>
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
                                                        <DropdownItem onPress={() => openViewModal(user)}>View</DropdownItem>
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
                    <Modal isOpen={isAddModal} onOpenChange={onOpenChange} onClose={closeAddModal}>
                        <ModalContent>
                            {(closeAddModal) => (
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
                                        <Button color="danger" variant="light" onPress={closeAddModal}>
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

                    <Modal isOpen={isViewModal} onOpenChange={onOpenChange} onClose={closeViewModal}>
                        <ModalContent>
                            {(closeViewModal) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">View User</ModalHeader>
                                    <ModalBody>
                                        <div className='flex flex-col gap-2'>
                                            <p className='flex flex-row justify-start items-center gap-3'>
                                                <span><FaUser className='text-xl' /></span>
                                                <span>{singleUser.userName}</span>
                                            </p>
                                            <p className='flex flex-row justify-end items-center gap-3'>
                                                <span>{singleUser.userEmail}</span>
                                                <span><MdEmail className='text-xl' /></span>
                                            </p>
                                            <p className='flex flex-row justify-start items-center gap-3'>
                                                <span><FaMobileAlt className='text-xl' /></span>
                                                <span>{singleUser.userContact}</span>
                                            </p>
                                            <p className='flex flex-row justify-end items-center gap-3'>
                                                <span>{singleUser.userAddress}</span>
                                                <span><FaHome className='text-xl' /></span>
                                            </p>
                                            <p className='flex flex-row justify-start items-center gap-3'>
                                                <span><RiShieldUserFill className='text-xl' /></span>
                                                <span>{singleUser.userType}</span>
                                            </p>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={closeViewModal}>
                                            Close
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