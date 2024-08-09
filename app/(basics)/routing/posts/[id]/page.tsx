import React from 'react';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardBody, Image, CardFooter } from "@nextui-org/react";

interface PostPageProps {
    params: { id: string };
}

const posts = [
    { id: '1', title: 'Understanding Next.js Routing', content: 'Content for routing post.', rating: '5', label: 'Next.js' },
    { id: '2', title: 'Dynamic Routes in Next.js', content: 'Content for dynamic routes post.', rating: '10', label: 'Next.js' },
    { id: '3', title: 'Next.js Layouts and Pages', content: 'Content for layouts and pages post.', rating: '15', label: 'Next.js' },
    { id: '4', title: 'Next.js Navigation', content: 'Content for navigation post.', rating: '20', label: 'Next.js' },
    { id: '5', title: 'Next.js Link Component', content: 'Content for link component post.', rating: '25', label: 'Next.js' },
    { id: '6', title: 'Next.js Router Component', content: 'Content for router component post.', rating: '30', label: 'Next.js' },
];

const PostPage = ({ params }: PostPageProps) => {
    const post = posts.find((post) => post.id === params.id);

    if (!post) {
        notFound();
    }

    return (
        <div className='flex justify-center items-center py-4 px-2'>
            <Card className="py-4" key={post?.id} isHoverable>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">{post?.label}</p>
                    <small className="text-default-500">{post?.title}</small>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src="https://i.ytimg.com/vi/0DFJnvyFqDY/hqdefault.jpg"
                    />
                </CardBody>
                <CardFooter className='flex flex-col'>
                    <p>{post?.content}</p>
                    <p className='text-end'>Rating: {post?.rating}</p>
                </CardFooter>
            </Card>
        </div>
    );
}

export default PostPage;