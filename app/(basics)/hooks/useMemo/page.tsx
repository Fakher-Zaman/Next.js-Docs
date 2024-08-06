"use client";

import { Card, Input } from '@nextui-org/react';
import React, { useMemo, useState } from 'react';

// Sample data
const items = [
    { id: 1, name: 'Apple', bg: 'bg-success-50', color: 'text-foreground' },
    { id: 2, name: 'Banana', bg: 'bg-success-100', color: 'text-foreground' },
    { id: 3, name: 'Cherry', bg: 'bg-success-200', color: 'text-foreground' },
    { id: 4, name: 'Date', bg: 'bg-success-300', color: 'text-foreground' },
    { id: 5, name: 'Elderberry', bg: 'bg-success-400', color: 'text-foreground' },
    { id: 6, name: 'Fig', bg: 'bg-success-500', color: 'text-background' },
    { id: 7, name: 'Grape', bg: 'bg-success-600', color: 'text-background' },
    { id: 8, name: 'Honeydew', bg: 'bg-success-700', color: 'text-background' },
    { id: 9, name: 'Indigo Berry', bg: 'bg-success-800', color: 'text-background' },
    { id: 10, name: 'Jackfruit', bg: 'bg-success-900', color: 'text-background' },
];

const useMemoHook: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredItems = useMemo(() => {
        console.log('Filtering items...');
        return items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm]);

    return (
        <section>
            <Card className='sm:min-w-[500px] flex flex-col items-center p-4 shadow-md rounded-lg'>
                <h2 className='text-2xl font-bold mb-4'>Filtered List</h2>
                <Input
                    type='text'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search items...'
                    className='text-center border rounded-md mb-4'
                />
                <ul className='flex flex-col gap-2 list-none w-full'>
                    {filteredItems.map(item => (
                        <li
                            key={item.id}
                            className={`w-full text-center ${item.color} ${item.bg} p-2 rounded-md shadow-sm`}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </Card>
        </section>
    )
}

export default useMemoHook;