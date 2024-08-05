"use client";

import { Button, Input } from '@nextui-org/react';
import React, { useState } from 'react';

interface ItemFormProps {
    onSubmit: (item: { name: string; quantity: number }) => void;
    existingItem?: { name: string; quantity: number };
}

const ItemForm: React.FC<ItemFormProps> = ({ onSubmit, existingItem }) => {
    const [name, setName] = useState(existingItem?.name || '');
    const [quantity, setQuantity] = useState(existingItem?.quantity || 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, quantity });
        setName('');
        setQuantity(1);
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col mb-4'>
            <div className='flex flex-row gap-2'>
                <Input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant='bordered'
                    placeholder='Type item name...'
                    label='Item Name'
                    className='mb-2'
                />
                <Input
                    type='number'
                    value={quantity.toString()}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    variant='bordered'
                    min={1}
                    placeholder='Quantity'
                    label='Quantity'
                    className='mb-2'
                />
            </div>
            <Button
                type='submit'
                color='primary'
                className='text-white w-64 mx-auto mt-2'
            >
                {existingItem ? 'Update' : 'Add'} Item
            </Button>
        </form>
    )
}

export default ItemForm;