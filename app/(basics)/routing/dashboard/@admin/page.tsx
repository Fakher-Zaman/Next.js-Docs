// app/(basics)/routing/dashboard/admin/page.tsx

"use client";

import { Button } from '@nextui-org/button';
import React from 'react';

export default function AdminPage() {
    return (
        <>
            <h1 className="text-xl font-bold mb-4 text-center">Admin Dashboard</h1>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">User Management</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Manage users, roles, and permissions from this section.
                        </p>
                        <Button color='primary' className="mt-4 px-4 py-2 text-white" isDisabled>Go to Users</Button>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Reports</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            View and generate reports on system usage and statistics.
                        </p>
                        <Button color='success' className="mt-4 px-4 py-2 text-white" isDisabled>View Reports</Button>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">System Settings</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Configure system settings and preferences here.
                        </p>
                        <Button color='warning' className="mt-4 px-4 py-2 text-white" isDisabled>System Settings</Button>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Manage notifications and alerts for system events.
                        </p>
                        <Button color='danger' className="mt-4 px-4 py-2 text-white" isDisabled>Manage Notifications</Button>
                    </div>
                </div>
            </div>
        </>
    );
}
