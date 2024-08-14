import React from 'react';
import Image from 'next/image';
import wonders, { WonderImage } from '../../../wonders';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

const photoModal = ({
    params: { id },
}: {
    params: { id: string };
}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const photo: WonderImage = wonders.find((p) => p.id === id)!;

    return (
        <>
            {/* <Button onPress={onOpen}>Open Modal</Button> */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">View Details</ModalHeader>
                            <ModalBody>
                                <Image
                                    alt={photo.name}
                                    src={photo.src}
                                    className="w-full object-cover aspect-square"
                                    width={400}
                                    height={400}
                                />
                                <div className="bg-white p-4">
                                    <h2 className="text-xl font-semibold">{photo.name}</h2>
                                    <h3>{photo.photographer}</h3>
                                    <h3>{photo.location}</h3>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default photoModal;