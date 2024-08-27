import Link from "next/link";
import wonders from "./wonders";
import Image from "next/image";
import { Card, CardBody } from '@nextui-org/react';

export default function Home() {
  return (
    <main className="container mx-auto">
      <div className="my-4">
        <h1 className="text-xl font-bold text-center">
          New Wonders of the World
        </h1>
        <p className="text-center">Intercepting Routes</p>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 w-full">
        {wonders.map(({ id, src, name }) => (
          <Card className="bg-white dark:bg-gray-800 py-4 cursor-pointer" key={id} isHoverable isPressable>
            <CardBody className="overflow-visible py-2">
              <Link key={id} href={`/routing/photo-feed/${id}`}>
                <Image
                  alt={name}
                  src={src}
                  className="w-full object-cover aspect-square"
                  width={400}
                  height={400}
                />
              </Link>
            </CardBody>
          </Card>
        ))}
      </div>
    </main>
  );
}
