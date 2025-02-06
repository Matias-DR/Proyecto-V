'use client'

import { Dispatch, SetStateAction } from 'react'

import { Input } from '@/components/ui/input'
import { MultiSelect } from '@/components/ui/multi-select'
import { GetParamsPosts } from '@/core/post/api'
import { CATEGORIES, CONTINENTS, COUNTRIES } from '@/lib/constants'

export interface Props {
  setParams: Dispatch<SetStateAction<GetParamsPosts>>
}

const Filter = ({ setParams }: Props) => {
  const setParam = (field: keyof GetParamsPosts) => (value?: string | string[]) => {
    setParams((prevParams) => {
      const updatedParams = { ...prevParams, [field]: value }
      if (value === undefined || value === '' || value.length === 0) delete updatedParams[field]
      return updatedParams
    })
  }

  return (
    <article className='relative bg-blue-300/10 rounded-lg'>
      <div className='sticky top-0 flex flex-col gap-2 p-2 '>
        <h2 className='text-lg font-bold text-center'>Filtros</h2>
        <Input
          placeholder='Nombre/Descripción'
          debounce={500}
          onChange={(e) => {
            setParam('search')(e.target.value)
          }}
          className='bg-white/15 text-white font-bold border-blue-400'
        />
        <MultiSelect
          options={CATEGORIES.map((category) => ({ label: category, value: category }))}
          onValueChange={(value) => setParam('category')(value)}
          variant='inverted'
          animation={2}
          maxCount={3}
          placeholder='Categoría'
          className='bg-white/15 text-white font-bold border-blue-400'
        />
        <MultiSelect
          options={CONTINENTS.map((continent) => ({ label: continent, value: continent }))}
          onValueChange={(value) => setParam('region')(value)}
          variant='inverted'
          animation={2}
          maxCount={3}
          placeholder='Región'
          className='bg-white/15 text-white font-bold border-blue-400'
        />

        <MultiSelect
          options={COUNTRIES.map((country) => ({ label: country, value: country }))}
          onValueChange={(value) => setParam('country')(value)}
          variant='inverted'
          animation={2}
          maxCount={3}
          placeholder='País'
          className='bg-white/15 text-white font-bold border-blue-400'
        />
      </div>
    </article>
  )
}

export default Filter
