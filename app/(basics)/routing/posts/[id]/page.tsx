import React from 'react';
import { notFound } from 'next/navigation';

interface PostPageProps {
    params: { id: string };
}

const posts = [
    { id: '1', title: 'Understanding Next.js Routing', content: 'Content for routing post.' },
    { id: '2', title: 'Dynamic Routes in Next.js', content: 'Content for dynamic routes post.' },
    { id: '3', title: 'Next.js Layouts and Pages', content: 'Content for layouts and pages post.' },
];

const PostPage = ({ params }: PostPageProps) => {
    const post = posts.find((post) => post.id === params.id);

    if (!post) {
        notFound();
    }

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-3xl font-bold mb-4'>{post?.title}</h1>
            <p>{post?.content}</p>
        </div>
    );
}

export default PostPage;