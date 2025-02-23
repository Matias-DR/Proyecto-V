'use client'

import Link from 'next/link'

import { MenuIcon } from 'lucide-react'

import { SignOutButton } from '@/components/auth/sign/out/button'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { PostsProvider, usePostsContext } from '@/contexts/posts'

const Component = () => {
  const { user } = usePostsContext()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          className='hover:cursor-pointer'
        >
          <MenuIcon className='size-6!' />
        </Button>
      </SheetTrigger>
      <SheetContent className='bg-rose-700 bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-50'>
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
          <SheetDescription asChild>
            <div className='h-[90vh] flex flex-col justify-between py-4 text-white text-base'>
              <div className='flex flex-col gap-2'>
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
              </div>
              <div>
                <p>
                  Usuario: <span className='italic font-bold'>{user.name}</span>
                </p>
                <p>
                  Nick: <span className='italic font-bold'>{user.nickname}</span>
                </p>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

const HeaderDropdownMenu = () => (
  <PostsProvider>
    <Component />
  </PostsProvider>
)

export default HeaderDropdownMenu
