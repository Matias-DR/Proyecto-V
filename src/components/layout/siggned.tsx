import { Fragment } from 'react'

import { HeaderDropdownMenu } from '@/components/header/dropdown-menu'

export interface Props {
  children: React.ReactNode
}

export const SiggnedLayout = ({ children }: Props) => {
  return (
    <Fragment>
      <header className='absolute top-0 right-0 p-2 z-50'>
        <HeaderDropdownMenu />
      </header>
      {children}
    </Fragment>
  )
}
