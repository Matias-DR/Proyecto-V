import Image from 'next/image'

import { CircleFadingPlus } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className='h-screen bg-main bg-cover bg-center bg-opacity-50'>
      <section className='flex justify-between border border-red-400'>
        <article className='flex gap-4'>
          <div className='size-48'>
            <Image
              src='/heroes/07.png'
              width={1024}
              height={1024}
              alt='welcome-image'
              className=''
            />
          </div>
          <div className='flex flex-col justify-center'>
            <h1 className='text-2xl font-bold'>Títutlo de bienvenida</h1>
            <p className=''>Definición/Descripción de un héroe y su camino</p>
          </div>
        </article>
        <article>
          <Button variant='ghost' size='icon' className='!size-48'>
            <CircleFadingPlus className='!size-36 animate-spin' />
          </Button>
        </article>
      </section>
      <section>
        <article></article>
        <article></article>
      </section>
    </div>
  )
}
