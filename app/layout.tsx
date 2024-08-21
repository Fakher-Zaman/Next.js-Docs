import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BodyComponent from "./BodyComponent";
import { Navbar } from "@nextui-org/react";
import NavbarComponent from "@/components/NavbarComponent";
import ReduxProvider from "@/store/provider";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Docs - Basics",
  description: "Try Different Basics Level Examples to explore the Next.js Concepts!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxProvider>
        <BodyComponent>
          <main className="flex min-h-screen flex-col">
            <NavbarComponent />
            <div className="md:py-6 md:px-16 p-4">
              <header className="flex flex-col justify-center items-center">
                <h3 className="text-center text-3xl">Next.js Docs</h3>
                <p className="text-center">Try Different Examples to explore the Next.js Concepts!</p>
              </header>
              <div className="mx-2 my-10">
                {children}
                <ToastContainer />
              </div>
            </div>
          </main>
        </BodyComponent>
      </ReduxProvider>
    </html>
  );
}
