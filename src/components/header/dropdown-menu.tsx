import Link from 'next/link'

import { MenuIcon } from 'lucide-react'

import { SignOutButton } from '@/components/auth/sign/out/button'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

export const HeaderDropdownMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost'>
          <MenuIcon className='size-6!' />
        </Button>
      </SheetTrigger>
      <SheetContent className='bg-rose-700 bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-50'>
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
          <SheetDescription className='flex flex-col gap-2 py-4 text-white text-base'>
            <Link
              href='/'
              className='hover:transition hover:scale-110 origin-left'
            >
              Ir al inicio
            </Link>
            <Link
              href='/post/create'
              className='hover:transition hover:scale-110 origin-left'
            >
              ¡Publica tu héroe!
            </Link>
            <span className='hover:transition hover:scale-110 origin-left'>
              <SignOutButton />
            </span>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
