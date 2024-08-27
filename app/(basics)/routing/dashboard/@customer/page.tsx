// app/(basics)/routing/dashboard/customer/page.tsx

"use client";

import { Button } from '@nextui-org/button';
import React from 'react';

export default function CustomerPage() {
    return (
        <>
            <div className='my-4'>
                <h1 className="text-xl font-bold text-center">Customer Dashboard</h1>
                <p className='text-center'>Parallel Routes</p>
            </div>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Profile</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            View and update your personal information here.
                        </p>
                        <Button color='primary' className="mt-4 px-4 py-2 text-white" isDisabled>Edit Profile</Button>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Review your recent orders and track their status.
                        </p>
                        <Button color='success' className="mt-4 px-4 py-2 text-white" isDisabled>View Orders</Button>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Support</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Need help? Access our support resources here.
                        </p>
                        <Button color='warning' className="mt-4 px-4 py-2 text-white" isDisabled>Contact Support</Button>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Manage your account settings and preferences.
                        </p>
                        <Button color='danger' className="mt-4 px-4 py-2 text-white" isDisabled>Account Settings</Button>
                    </div>
                </div>
            </div>
        </>
    );
}
