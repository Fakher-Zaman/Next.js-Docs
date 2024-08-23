// app/about/page.tsx
export default function About() {
    return (
        <main className="flex flex-col items-center justify-center md:p-4">
            <h1 className="md:text-3xl text-2xl font-bold md:mb-4 my-4">About This Project</h1>
            <p className="text-lg">
                This project demonstrates various routing features in Next.js 14,
                including dynamic routes, nested routes, and more.
            </p>
        </main>
    );
}
