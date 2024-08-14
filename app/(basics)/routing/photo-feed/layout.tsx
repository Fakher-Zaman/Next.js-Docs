export const metadata = {
    title: 'Next.js Routing Demo',
    description: 'Exploring Next.js 14 intercepting routing features',
};

export default function RootLayout({
    children,
    modal,
}: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    return (
        <>
            {children}
            {modal}
        </>
    );
}
