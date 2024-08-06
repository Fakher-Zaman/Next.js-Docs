import CurrencyConverter from '@/components/CurrencyConverter';
import React from 'react';

const customHooks = () => {
    return (
        <section className='sm:min-w-[500px] mx-auto'>
            <CurrencyConverter />
        </section>
    )
}

export default customHooks;