"use client";

import { Button } from '@nextui-org/button';
import React, { useState } from 'react';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';
import { RxReset } from 'react-icons/rx';

const useStateHook = () => {
    const [count, setCount] = useState<number>(0);

    return (
        <>
            <section className='flex flex-col justify-center items-center gap-5'>
                <p className='text-large'>Count value is: {count}</p>
                <div className='flex justify-center items-center gap-5'>
                    <Button onClick={() => setCount(count + 1)} variant='bordered' color='primary' className='flex flex-row justify-center items-center gap-1'>
                        <span className='text-medium'>Plus</span><CiSquarePlus className='text-[25px]' />
                    </Button>
                    <Button onClick={() => setCount(count - 1)} variant='bordered' color='primary' className='flex flex-row justify-center items-center gap-1'>
                        <span className='text-medium'>Minus</span><CiSquareMinus className='text-[25px]' />
                    </Button>
                    <Button onClick={() => setCount(0)} variant='bordered' color='primary' className='flex flex-row justify-center items-center gap-1'>
                        <span className='text-medium'>Reset</span><RxReset className='text-[25px]' />
                    </Button>
                </div>
            </section>
        </>
    )
}

export default useStateHook;