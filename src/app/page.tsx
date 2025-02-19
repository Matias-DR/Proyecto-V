import Image from 'next/image'
import Link from 'next/link'

import { CircleFadingPlus } from 'lucide-react'

import View from '@/components/post/view'

import { SiggnedLayout } from '@/components/layout/siggned'

export default function Home() {
  return (
    <SiggnedLayout>
      <div className='relative h-screen p-2'>
        <div className='fixed -z-10 inset-0 opacity-15'>
          <Image
            src='/heroes/08.webp'
            alt='background-image'
            fill
            className='object-cover object-center'
            quality={100}
            priority
          />
        </div>
        <div className='relative z-10 h-full flex flex-col gap-2'>
          <section className='flex justify-between gap-2'>
            <article className='flex-1 flex gap-4 bg-blue-300/10 rounded-lg'>
              <div className='size-48 p-2'>
                <Image
                  src='/heroes/07.png'
                  width={1024}
                  height={1024}
                  alt='welcome-image'
                  priority
                  className='rounded-md'
                />
              </div>
              <div className='flex flex-col justify-center'>
                <h1 className='text-4xl font-bold'>Títutlo de bienvenida</h1>
                <p className=''>Definición/Descripción de un héroe y su camino</p>
              </div>
            </article>
            <article className='w-36 h-full pt-12 flex justify-center items-center overflow-hidden'>
              <Link
                href='/post/create'
                className='hover:cursor-pointer hover:bg-transparent hover:scale-110 transition origin-center'
              >
                <CircleFadingPlus className='size-32! animate-spin' />
              </Link>
            </article>
          </section>
          <section className='sticky top-0 flex gap-2 pb-2'>
            <View />
          </section>
        </div>
      </div>
    </SiggnedLayout>
  )
}
