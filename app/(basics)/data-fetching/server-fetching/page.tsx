import { Card, CardBody, CardFooter, CardHeader, Image } from '@nextui-org/react';
import React from 'react';

type Item = {
    id: Number;
    title: String;
    category: String;
    price: Number;
    thumbnail: String;
};

const page = async () => {
    const response = await fetch('https://dummyjson.com/products?sortBy=price&order=asc');
    const data = await response.json();
    // console.log(data.carts);

    return (
        <>
            <div className='my-4'>
                <h1 className="text-xl font-bold text-center">Products</h1>
                <p className='text-center'>Data Fetching with Server</p>
            </div>
            <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center items-center gap-5 w-full'>
                {data.products.map((item: Item) => (
                    <Card className="py-4 bg-white dark:bg-gray-800" key={item.id.toString()}>
                        <CardHeader className="flex-col items-start">
                            <p className="text-tiny uppercase font-bold">{item.title}</p>
                            <small className="text-default-500">${item.price.toString()}</small>
                            <h4 className="font-bold text-large">{item.category}</h4>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2 mx-auto flex justify-center items-center">
                            <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src={item.thumbnail.toString()}
                                width={270}
                            />
                        </CardBody>
                    </Card>
                ))}
            </section>
        </>
    )
}

export default page;