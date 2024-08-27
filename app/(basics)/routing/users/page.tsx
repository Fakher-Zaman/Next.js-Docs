"use client";

import React, { useCallback, useEffect, useState } from 'react';
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, useDisclosure,
    Spinner, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem
} from "@nextui-org/react";
import { toast } from 'react-toastify';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaMobileAlt, FaRegUser } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { IoHomeOutline } from 'react-icons/io5';
import { GrUserAdmin } from 'react-icons/gr';

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
    const [isAddModal, setIsAddModal] = useState<boolean>(false);
    const [isViewModal, setIsViewModal] = useState<boolean>(false);
    const [isEditModal, setIsEditModal] = useState<boolean>(false);
    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);

    const notify = (message: string, type: "success" | "error" | "warning" = "success") => {
        toast[type](message);
    };

    const getUsers = useCallback(() => {
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
    }, []);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
        setSingleUser({ ...singleUser, [e.target.name]: e.target.value });
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
        setSingleUser({
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
            closeAddModal();
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
        setSingleUser(user);
        setIsViewModal(true);
    }

    const closeViewModal = () => {
        setIsViewModal(false);
    }

    const openEditModal = (user: User) => {
        setSingleUser(user);
        setIsEditModal(true);
    }

    const closeEditModal = () => {
        setIsEditModal(false);
    }

    const openDeleteModal = (user: User) => {
        setSingleUser(user);
        setIsDeleteModal(true);
    }

    const closeDeleteModal = () => {
        setIsDeleteModal(false);
    }

    const handleEditUser = async (userId: string) => {
        setDataLoading(true);
        try {
            const editUserWithId = {
                userId: Date.now().toString(),
                userName: singleUser.userName,
                userEmail: singleUser.userEmail,
                userContact: singleUser.userContact,
                userAddress: singleUser.userAddress,
                userType: singleUser.userType
            };
            if (singleUser.userName && singleUser.userEmail && singleUser.userContact && singleUser.userAddress && singleUser.userType) {
                const res = await fetch(`/api/users/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Required-Header': 'customValue123',
                    },
                    body: JSON.stringify(editUserWithId),
                });
                if (res.ok) {
                    const { message, users: updatedUsers } = await res.json();
                    setUsers(updatedUsers);
                    notify(message, "success");
                    onOpenChange(); // Close modal
                    getUsers();
                } else {
                    const { message } = await res.json();
                    notify(message || "Failed to edit user!", "error");
                }
            } else {
                notify("All fields are required!", "warning");
            }
        } catch (error) {
            console.error("Error editing user:", error);
            notify("An error occurred. Please try again!", "error");
        } finally {
            setDataLoading(false);
            emptyFields();
            closeEditModal();
        }
    }

    const handleDeleteUser = async (userId: string) => {
        setDataLoading(true);
        try {
            const res = await fetch(`/api/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'X-Required-Header': 'customValue123',
                },
            });
            if (res.ok) {
                const { message } = await res.json();
                notify(message, "success");
                onOpenChange(); // Close modal
                getUsers();
            } else {
                const { message } = await res.json();
                notify(message || "Failed to delete user!", "error");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            notify("An error occurred. Please try again!", "error");
        } finally {
            setDataLoading(false);
            closeDeleteModal();
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
                    <div className='my-4'>
                        <div className='flex flex-row items-center gap-5 justify-center w-full'>
                            <h1 className="text-xl font-bold">Users List</h1>
                            <Button onPress={openAddModal}>Add User</Button>
                        </div>
                        <p className='text-center mt-2'>Route Handlers & Middlewares</p>
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
                                                        <DropdownItem onPress={() => openEditModal(user)}>Edit</DropdownItem>
                                                        <DropdownItem onPress={() => openDeleteModal(user)}>Delete</DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            )}
                        </Table>
                    </div>

                    {/* Add User Modal */}
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
                                            Cancel
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

                    {/* View User Modal */}
                    <Modal isOpen={isViewModal} onOpenChange={onOpenChange} onClose={closeViewModal}>
                        <ModalContent>
                            {(closeViewModal) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">View User</ModalHeader>
                                    <ModalBody>
                                        <div className='flex flex-col gap-2'>
                                            <p className='flex flex-row justify-start items-center gap-3'>
                                                <span><FaRegUser className='text-xl' /></span>
                                                <span>{singleUser.userName}</span>
                                            </p>
                                            <p className='flex flex-row justify-end items-center gap-3'>
                                                <span>{singleUser.userEmail}</span>
                                                <span><MdOutlineEmail className='text-xl' /></span>
                                            </p>
                                            <p className='flex flex-row justify-start items-center gap-3'>
                                                <span><FaMobileAlt className='text-xl' /></span>
                                                <span>{singleUser.userContact}</span>
                                            </p>
                                            <p className='flex flex-row justify-end items-center gap-3'>
                                                <span>{singleUser.userAddress}</span>
                                                <span><IoHomeOutline className='text-xl' /></span>
                                            </p>
                                            <p className='flex flex-row justify-start items-center gap-3'>
                                                <span><GrUserAdmin className='text-xl' /></span>
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

                    {/* Edit User Modal */}
                    <Modal isOpen={isEditModal} onOpenChange={onOpenChange} onClose={closeEditModal}>
                        <ModalContent>
                            {(closeEditModal) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Edit User</ModalHeader>
                                    <ModalBody>
                                        <Input
                                            name="userName"
                                            label="Name"
                                            placeholder="Enter user name"
                                            value={singleUser.userName}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            name="userEmail"
                                            label="Email"
                                            placeholder="Enter user email"
                                            value={singleUser.userEmail}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            name="userContact"
                                            label="Contact"
                                            placeholder="Enter contact number"
                                            value={singleUser.userContact}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            name="userAddress"
                                            label="Address"
                                            placeholder="Enter address"
                                            value={singleUser.userAddress}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            name="userType"
                                            label="Type"
                                            placeholder="Enter user type"
                                            value={singleUser.userType}
                                            onChange={handleInputChange}
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={closeEditModal}>
                                            Cancel
                                        </Button>
                                        <Button
                                            isLoading={dataLoading}
                                            color="primary"
                                            onPress={() => handleEditUser(singleUser.userId)}
                                            className='text-white'
                                            isDisabled={singleUser.userName === '' || singleUser.userEmail === '' || singleUser.userContact === '' || singleUser.userAddress === '' || singleUser.userType === ''}
                                        >
                                            Edit
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>

                    <Modal isOpen={isDeleteModal} onOpenChange={onOpenChange} onClose={closeDeleteModal}>
                        <ModalContent>
                            {(closeDeleteModal) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Delete User</ModalHeader>
                                    <ModalBody>
                                        <div className='flex flex-col gap-4'>
                                            <p className='text-danger-700'>Are you sure you want to delete this user?</p>
                                            <p className='flex flex-row items-center gap-2'><span>Name:</span><span>{singleUser.userName}</span></p>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={closeDeleteModal}>
                                            Cancel
                                        </Button>
                                        <Button
                                            isLoading={dataLoading}
                                            color="danger"
                                            onPress={() => handleDeleteUser(singleUser.userId)}
                                            className='text-white'
                                        >
                                            Confirm
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