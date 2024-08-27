"use client";

import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Divider, Spinner } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

interface Comment {
    id: Number;
    body: String;
    postId: Number;
    likes: String;
    user: {
        id: Number;
        username: String;
        fullName: String;
    };
}

const Fetching = () => {
    const [fetchData, setFetchData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchAPI() {
        setIsLoading(true);
        const data = await fetch('https://dummyjson.com/comments', { cache: 'force-cache' })
            .then(res => res.json());
        setIsLoading(false);
        // console.log(data);
        setFetchData(data.comments);
    }

    useEffect(() => {
        fetchAPI();
    }, []);

    return (
        <>
            <div className='my-4'>
                <h1 className="text-xl font-bold text-center">Comments</h1>
                <p className='text-center'>Data Fetching with Client</p>
            </div>
            {isLoading ? (
                <div className='flex justify-center items-center p-4 mt-10'>
                    <Spinner />
                </div>
            ) : (
                <div>
                    <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 container mx-auto'>
                        {fetchData.map((item: Comment) => (
                            <Card className="max-w-[340px]" key={item.id.toString()}>
                                <CardHeader className="justify-between">
                                    <div className="flex gap-5">
                                        <Avatar isBordered radius="full" size="md" src={`https://nextui.org/avatars/avatar-${item.likes}.png`} />
                                        <div className="flex flex-col gap-1 items-start justify-center">
                                            <h4 className="text-small font-semibold leading-none text-default-600">{item.user.fullName}</h4>
                                            <h5 className="text-small tracking-tight text-default-400">@{item.user.username}</h5>
                                        </div>
                                    </div>
                                    <Button
                                        className={"text-white"}
                                        isDisabled
                                        color="primary"
                                        radius="full"
                                        size="sm"
                                        variant="solid"
                                    >
                                        Follow
                                    </Button>
                                </CardHeader>
                                <CardBody className="px-3 py-0 text-small text-default-400 min-h-[60px]">
                                    <p>
                                        {item.body}
                                    </p>
                                    <span className="pt-2">
                                        #FrontendWith{item.user.username}
                                        <span className="py-2" aria-label="computer" role="img">
                                            💻
                                        </span>
                                    </span>
                                </CardBody>
                                <Divider />
                                <CardFooter className="gap-3">
                                    <div className="flex gap-1">
                                        <p className="font-semibold text-default-400 text-small">{item.likes}</p>
                                        <p className=" text-default-400 text-small">Followers</p>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </section>
                </div>
            )}
        </>
    )
}

export default Fetching;