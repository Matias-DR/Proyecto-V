import { SiggnedLayout } from '@/components/layout/siggned'

export type Props = Readonly<{
  children: React.ReactNode
}>

const Layout = ({ children }: Props) => {
  return (
    <SiggnedLayout>
      <section className='h-screen flex flex-col justify-center items-center bg-post-form bg-cover bg-no-repeat bg-[center_top_50%]'>
        <div className='max-h-[90vh] py-8 px-4 flex flex-col justify-center items-center gap-6 bg-blue-100 bg-opacity-90 border-2 border-blue-300 rounded-lg'>
          {children}
        </div>
      </section>
    </SiggnedLayout>
  )
}

export default Layout
