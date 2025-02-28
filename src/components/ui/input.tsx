'use client'

import * as React from 'react'

import { ChangeEvent, useState } from 'react'

import { cn } from '@/lib/utils'

const variants = {
  default:
    'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  simple:
    'flex h-10 w-full border-b border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
}

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'> & { debounce?: number; variant?: 'default' | 'simple' }>(
  ({ className, type, onChange, debounce, variant = 'default', ...props }, ref) => {
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout>()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (debounce && debounce > 0) {
        if (debounceTimeout) clearTimeout(debounceTimeout)

        setDebounceTimeout(
          setTimeout(() => {
            if (onChange) onChange(e)
          }, debounce)
        )
      } else {
        if (onChange) onChange(e)
      }
    }

    return (
      <input
        type={type}
        className={cn(variants[variant], className)}
        ref={ref}
        onChange={handleChange}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
