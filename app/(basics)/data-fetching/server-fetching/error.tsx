'use client'

import { Button } from '@nextui-org/button'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className='flex flex-col justify-center items-center pt-10 pb-5 px-2 gap-4'>
            <h2 className='text-center text-danger'>Error while Fetching Data!</h2>
            <Button
                onClick={() => reset()}
            >
                Try again
            </Button>
        </div>
    );
}