"use client";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Modal as NextUIModal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";

export default function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isOpen, onOpenChange } = useDisclosure({ defaultOpen: true });

    const onDismiss = useCallback(() => {
        onOpenChange();
        router.back();
    }, [router, onOpenChange]);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onDismiss();
        },
        [onDismiss]
    );

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

    return (
        <NextUIModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onDismiss} className="bg-white dark:bg-gray-800">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onDismiss}>
                        Close
                    </Button>
                    <Button color="primary" className="text-white" onPress={onDismiss}>
                        Action
                    </Button>
                </ModalFooter>
            </ModalContent>
        </NextUIModal>
    );
}
