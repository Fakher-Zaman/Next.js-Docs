// app/posts/page.tsx

import PostList from "@/components/PostList";

export default function PostsPage() {
    return (
        <div className="container mx-auto">
            <h1 className="text-xl font-bold mb-4 text-center">All Posts</h1>
            <PostList />
        </div>
    );
}
