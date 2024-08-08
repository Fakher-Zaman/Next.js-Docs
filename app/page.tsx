import DisplayCards from "@/components/DisplayCards";
import { NextUIProvider } from "@nextui-org/react";

export default function Basics() {
  const list = [
    {
      title: "React Redux",
      path: "/redux",
      img: "https://negativeepsilon.com/media/attachments/blobs/2023/01/09/PNbZQxCiPVkNWzDNPDx24j_redux_rm05scp.png_riwC4kc5pLH7k1e5ReNajv_2FOQ.webp",
      date: "25/07/2024",
    },
    {
      title: "React Hooks",
      path: "/hooks/useState",
      img: "https://miro.medium.com/v2/resize:fit:1400/1*-Ijet6kVJqGgul6adezDLQ.png",
      date: "26/07/2024",
    },
    {
      title: "Next.js Routing",
      path: "/routing",
      img: "https://miro.medium.com/v2/resize:fit:1358/0*HlUaNPJjMmoWJiNf",
      date: "08/08/2024",
    }
  ];

  return (
    <NextUIProvider>
      <section className="gap-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-1">
        <DisplayCards list={list} />
      </section>
    </NextUIProvider>
  );
}
