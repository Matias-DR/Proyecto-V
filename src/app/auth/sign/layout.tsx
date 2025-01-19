export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className='py-8 flex flex-col justify-center items-center gap-6'>
      <h1 className='text-6xl text-center'>Héroes</h1>
      <article>{children}</article>
    </section>
  )
}
