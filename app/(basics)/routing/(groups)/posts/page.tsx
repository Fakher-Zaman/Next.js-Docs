// app/posts/page.tsx

import PostList from "@/components/PostList";

export default function PostsPage() {
    return (
        <div className="container mx-auto">
            <div className="my-4">
                <h1 className="text-xl font-bold text-center">All Posts</h1>
                <p className="text-center">Dynamic Routes</p>
            </div>
            <PostList />
        </div>
    );
}
