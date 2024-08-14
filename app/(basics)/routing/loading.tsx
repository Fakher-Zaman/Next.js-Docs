"use client";
import { Spinner } from '@nextui-org/react';
import React from 'react';

const Loading = () => {
    return (
        <div className='flex justify-center items-center w-full h-[350px]'>
            <Spinner color="primary" />
        </div>
    );
}

export default Loading;