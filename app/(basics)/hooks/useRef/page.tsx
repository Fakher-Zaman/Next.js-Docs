"use client";

import { Button } from '@nextui-org/button';
import { Card, Input } from '@nextui-org/react';
import React, { useEffect, useRef, useState } from 'react';

const useRefHook = () => {
    const [count, setCount] = useState(60);
    const [isRunning, setIsRunning] = useState(false);

    const intervalRef = useRef<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const startTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
            intervalRef.current = window.setInterval(() => {
                setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
            }, 1000);
        }
    };

    const pauseTimer = () => {
        if (isRunning && intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsRunning(false);
        }
    };

    const resetTimer = () => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsRunning(false);
        setCount(60);
    };

    return (
        <Card className='flex flex-col items-center p-4 shadow-md rounded-lg'>
            <h1 className='text-2xl font-bold mb-4'>Countdown Timer</h1>
            <Input
                ref={inputRef}
                type='number'
                value={count.toString()}
                onChange={(e) => setCount(Number(e.target.value))}
                className='text-center border border-gray-300 rounded-md p-2 mb-4'
                min="0"
                max="300"
            />
            <div className="flex items-center justify-center space-x-4 mb-4">
                <Button
                    onClick={startTimer}
                    color='primary'
                    className="text-white px-4 py-2 rounded-md"
                >
                    Start
                </Button>
                <Button
                    onClick={pauseTimer}
                    color='warning'
                    className="text-white px-4 py-2 rounded-md"
                >
                    Pause
                </Button>
                <Button
                    onClick={resetTimer}
                    color='danger'
                    className="text-white px-4 py-2 rounded-md"
                >
                    Reset
                </Button>
            </div>
            <h2 className='text-xl font-semibold'>
                {count > 0 ? count : 'Time\'s up!'}
            </h2>
        </Card>
    )
}

export default useRefHook;