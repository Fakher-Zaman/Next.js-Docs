import React from 'react';

interface Item {
    id: number;
    name: string;
    quantity: number;
}

interface ItemListProps {
    items: Item[];
    onRemove: (id: number) => void;
    onEdit: (item: Item) => void;
}

const ItemList: React.FC<ItemListProps> = React.memo(({ items, onRemove, onEdit }) => {
    console.log("ItemList rendered");
    return (
        <ul className='list-none p-0'>
            {items.map(item => (
                <li key={item.id} className='flex justify-between items-center border-b p-2'>
                    <span>{item.name} - {item.quantity}</span>
                    <div>
                        <button onClick={() => onEdit(item)} className='text-primary p-1 rounded mr-2'>Edit</button>
                        <button onClick={() => onRemove(item.id)} className='text-danger p-1 rounded'>Remove</button>
                    </div>
                </li>
            ))}
        </ul>
    );
});

export default ItemList;