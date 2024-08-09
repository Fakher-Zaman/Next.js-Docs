"use client";
import Link from 'next/link';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { useRouter } from 'next/navigation';

const posts = [
    { id: 1, title: 'Understanding Next.js Routing', label: 'Next.js' },
    { id: 2, title: 'Dynamic Routes in Next.js', label: 'Next.js' },
    { id: 3, title: 'Next.js Layouts and Pages', label: 'Next.js' },
    { id: 4, title: 'Next.js Navigation', label: 'Next.js' },
    { id: 5, title: 'Next.js Link Component', label: 'Next.js' },
    { id: 6, title: 'Next.js Router Component', label: 'Next.js' },
];

const PostList = () => {
    const router = useRouter();

    return (
        <>
            <div className='grid grid-cols-4 gap-4 w-full'>
                {posts.map((post) => (
                    <Card className="py-4 cursor-pointer" key={post.id} onClick={() => router.push(`/routing/posts/${post.id}`)} isHoverable isPressable>
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <p className="text-tiny uppercase font-bold">{post.label}</p>
                            <small className="text-default-500">{post.title}</small>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                            <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src="https://i.ytimg.com/vi/0DFJnvyFqDY/hqdefault.jpg"
                                width={270}
                            />
                        </CardBody>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default PostList;