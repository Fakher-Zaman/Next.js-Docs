"use client";

import React, { useState, useCallback } from 'react';
import ItemForm from '@/components/ItemForm';
import ItemList from '@/components/ItemList';

interface Item {
    id: number;
    name: string;
    quantity: number;
}

const useCallbackHook: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [editingItem, setEditingItem] = useState<Item | null>(null);

    const addItem = useCallback((item: { name: string; quantity: number }) => {
        if (!item.name.trim()) return;
        setItems(prevItems => [
            ...prevItems,
            {
                id: prevItems.length + 1,
                ...item
            }
        ]);
    }, []);

    const updateItem = useCallback((item: { name: string; quantity: number }) => {
        if (!editingItem) return;
        setItems(prevItems =>
            prevItems.map(i =>
                i.id === (editingItem?.id || 0) ? { ...i, ...item } : i
            )
        );
        setEditingItem(null);
    }, [editingItem]);

    const removeItem = useCallback((id: number) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    }, []);

    const handleEdit = useCallback((item: Item) => {
        setEditingItem(item);
    }, []);

    const handleSubmit = (item: { name: string; quantity: number }) => {
        if (editingItem) {
            updateItem(item);
        } else {
            addItem(item);
        }
    };

    return (
        <section className='sm:min-w-[500px]'>
            <h1 className="text-2xl font-bold mb-4 text-center">Dynamic Item List</h1>
            <ItemForm onSubmit={handleSubmit} existingItem={editingItem || undefined} />
            <ItemList items={items} onRemove={removeItem} onEdit={handleEdit} />
        </section>
    )
}

export default useCallbackHook;