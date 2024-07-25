import React from 'react';
import { Card, CardFooter, CardBody, Image, Button } from "@nextui-org/react";

interface ListItem {
    title: string;
    img: string;
    date: string;
}

interface displayCardProps {
    list: ListItem[];
}

const DisplayCards: React.FC<displayCardProps> = ({ list }) => {
    return (
        <>
            {list.map((item: ListItem, index: number) => (
                <Card shadow="sm" key={index} isHoverable isPressable className=''>
                    <CardBody className="overflow-visible p-0">
                        <Image
                            shadow="sm"
                            radius="lg"
                            width="100%"
                            alt={item.title}
                            className="w-full object-cover h-[140px]"
                            src={item.img}
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-between">
                        <b>{item.title}</b>
                        <p className="text-default-500">{item.date}</p>
                    </CardFooter>
                </Card>
            ))}
        </>
    )
}

export default DisplayCards;