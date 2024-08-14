import Image from "next/image";
import wondersImages, { WonderImage } from "../wonders";
import { Card, CardHeader, CardFooter, CardBody } from '@nextui-org/react';

export default function PhotoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const photo: WonderImage = wondersImages.find((p) => p.id === id)!;

  return (
    <div className="container mx-auto py-4 w-[400px]">
      <Card>
        <CardHeader>{photo.name}</CardHeader>
        <CardBody>
          <Image
            alt={photo.name}
            src={photo.src}
            className="w-full object-cover aspect-square"
            width={200}
            height={200}
          />
        </CardBody>
        <CardFooter>
          <h3>{photo.photographer}</h3>
          <h3>{photo.location}</h3>
        </CardFooter>
      </Card>
    </div>
  );
}
