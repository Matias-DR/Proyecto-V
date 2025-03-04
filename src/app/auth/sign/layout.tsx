import { UnsiggnedLayout } from '@/components/layout/unsiggned'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <UnsiggnedLayout>
      <section className='h-screen flex flex-col justify-center items-center bg-heroes bg-cover bg-no-repeat bg-[center_top_15%]'>
        <div className='p-8 flex flex-col justify-center items-center gap-6 bg-blue-100 opacity-85 border-2 border-blue-300 rounded-lg'>
          <h1 className='gradient-text animate-gradient text-6xl text-center'>Héroes</h1>
          <article>{children}</article>
        </div>
      </section>
    </UnsiggnedLayout>
  )
}
