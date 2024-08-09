import { Card } from "@nextui-org/react";

// app/404.tsx
export default function Custom404() {
    return (
        <div className="flex flex-col w-full h-[350px] items-center justify-center">
            <h1 className="md:text-3xl text-xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="md:text-lg text-md">
                Sorry, the page you&apos;re looking for doesn&apos;t exist.
            </p>
        </div>
    );
}