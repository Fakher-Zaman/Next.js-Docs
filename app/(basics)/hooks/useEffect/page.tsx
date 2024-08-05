"use client";

import { Button } from '@nextui-org/button';
import React, { useEffect, useState } from 'react';
import { FaReact } from 'react-icons/fa';

const useEffectHook = () => {
    const [randomNumber, setRandomNumber] = useState<number>(0);
    const [effectLogs, setEffectLogs] = useState<String[]>([]);

    useEffect(() => {
        setEffectLogs((prevEffectLogs) => [...prevEffectLogs, 'effect fn has been invoked'])
    }, [randomNumber])

    return (
        <section className='flex flex-col justify-center items-center gap-5'>
            <div className='flex flex-col justify-center items-center gap-3'>
                <p className='text-large'>{randomNumber}</p>
                <Button
                    onClick={() => {
                        setRandomNumber(Math.random() * 100)
                    }}
                    variant='solid'
                    color='primary'
                    className='text-white'
                >
                    Generate random number!
                </Button>
            </div>
            <div>
                {effectLogs.map((effect, index) => (
                    <div key={index} className='flex items-center justify-center'>
                        {Array.from({ length: index }).map((_, i) => (
                            <FaReact key={i} className='mr-[10px] text-primary' />
                        ))}
                        <span>{effect}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default useEffectHook;