import Image from 'next/image'

import React, { useRef, useState } from 'react'

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

export interface ActionArgs {
  close: () => void
}

export interface Props {
  url: string
  name: string
  trigger: () => React.ReactNode
  actions?: (args: ActionArgs) => React.ReactNode
}

const FileViewer = ({ url, name, trigger, actions }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)

  const close = () => {
    if (ref && ref.current) ref.current.click()
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>{trigger()}</DialogTrigger>
      <DialogContent className='max-w-4xl'>
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        <ScrollArea>
          <div className='max-h-[60vh] mt-4 pe-4 flex flex-col gap-2'>
            <Image
              src={url}
              alt={name}
              sizes='100vw'
              layout='responsive'
              width={0}
              height={0}
              className='h-full object-contain'
            />
          </div>
        </ScrollArea>
        <DialogFooter className='w-full'>{actions && actions({ close })}</DialogFooter>
        <DialogClose
          ref={ref}
          className='hidden'
        />
      </DialogContent>
    </Dialog>
  )
}

export default FileViewer
