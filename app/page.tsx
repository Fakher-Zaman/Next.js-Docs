import DisplayCards from "@/components/DisplayCards";
import { NextUIProvider } from "@nextui-org/react";

export default function Basics() {
  const list = [
    {
      title: "Redux",
      path: "/redux",
      img: "https://negativeepsilon.com/media/attachments/blobs/2023/01/09/PNbZQxCiPVkNWzDNPDx24j_redux_rm05scp.png_riwC4kc5pLH7k1e5ReNajv_2FOQ.webp",
      date: "25/7/2024",
    },
  ];

  return (
    <NextUIProvider>
      <section className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {/* Pass the 'list' correctly as a prop */}
        <DisplayCards list={list} />
      </section>
    </NextUIProvider>
  );
}
