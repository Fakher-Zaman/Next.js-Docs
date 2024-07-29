import type { Metadata } from "next";
import TabsComponent from "@/components/TabsComponent";

export const metadata: Metadata = {
    title: "React Hooks",
    description: "Generated by create next app",
};

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
        <div>
            <TabsComponent />
        </div>
        <div className="flex justify-center items-center">
            {children}
        </div>
        </>
    )
}