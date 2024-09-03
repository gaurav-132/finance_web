import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';
import clsx from 'clsx';

const Modal = ({
    isOpen,
    onChange,
    title,
    description,
    children,
    modalWidth,
    minHeight,
    topMd,
    top,
    height
}) => {
    const handleOpenChange = (open) => {
        // Only allow closing when explicitly setting isOpen to false
        if (!open && isOpen) {
            return; // Prevent closing on overlay click or escape key press
        }
        onChange(open);
    };

    return (
        <Dialog.Root
            open={isOpen}
            onOpenChange={handleOpenChange}
        >
            <Dialog.Portal>
                <Dialog.Overlay
                    className='
                        backdrop-blur-sm
                        fixed
                        inset-0
                        z-[9998]
                    '
                />
                <Dialog.Content
                    style={{ width: `${modalWidth}`, minHeight: `${minHeight}`, top: `${top}`, height: `${height}`}}
                    className='
                        fixed
                        drop-shadow-sm
                        border
                        left-[50%]
                        h-[35%]
                        w-[80%]
                        md:w-[90vw]
                        translate-x-[-50%]
                        translate-y-[-50%]
                        rounded-md
                        bg-white
                        focus:outline-none
                        z-[9999]
                    '
                >
                    <Dialog.Title className={clsx(
                        'text-lg px-4 text-left font-bold',
                        title ? 'py-2' : 'py-4'
                    )}>
                        {title}
                    </Dialog.Title>
                    <hr/>
                    <Dialog.Description className='mb-5 text-sm leading-normal text-center'>
                        {description}
                    </Dialog.Description>
                    <div className='mb-5'>
                        {children}
                    </div>
                    <Dialog.Close asChild>
                        <button onClick={() => onChange(false)} className='text-neutral-400 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none justify-center rounded-full focus:outline-none'>
                            <IoMdClose />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default Modal;
