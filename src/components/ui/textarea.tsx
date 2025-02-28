import * as React from 'react'

import { cn } from '@/lib/utils'

const variants = {
  default: 'rounded-md border border-input',
  simple: 'border-b-2 border-blue-400'
}

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'> & { variant?: 'default' | 'simple' }>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'flex w-full bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none outline-none',
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
