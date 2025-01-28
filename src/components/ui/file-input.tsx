import { ImageUpIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { Control, FieldError, FieldValues } from 'react-hook-form'

import FileViewer, { Props as FieldViewerProps } from '@/components/shared/file-viewer'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface Props {
  control: Control<FieldValues, unknown>
  error: FieldError | undefined
}

export const FileInput = ({ control, error }: Props) => {
  const [file, setFile] = useState<Omit<FieldViewerProps, 'trigger'> | undefined>()
  const ref = useRef<HTMLLabelElement>(null)

  const openInput = () => {
    if (ref && ref.current) ref.current.click()
  }

  return (
    <FormField
      control={control}
      name='image'
      render={({ field: { onChange, ...field } }) => (
        <FormItem className='inline'>
          <FormLabel
            ref={ref}
            className='flex items-center gap-2 text-blue-400 font-bold hover:cursor-pointer'
          >
            Imagen
            <ImageUpIcon className='!size-4' />
          </FormLabel>{' '}
          <div
            onClick={() => !file && openInput()}
            className={cn('px-2 py-1 border border-blue-400 rounded-md shadow-sm', { 'hover:cursor-pointer': !file })}
          >
            <FormControl>
              <Input
                type='file'
                accept='image/*'
                onChange={(e) => {
                  if (e.target.files && e.target.files.length === 1) {
                    setFile({
                      url: URL.createObjectURL(e.target.files?.[0]),
                      name: e.target.files?.[0].name
                    })
                    onChange(e.target.files?.[0])
                  }
                }}
                {...field}
                value={undefined}
                className='hidden'
              />
            </FormControl>
            <p>
              <span className='text-blue-400 font-bold'>Imagen adjunta: </span>
              {error ? (
                <FormMessage className='inline text-base italic' />
              ) : field.value ? (
                file ? (
                  <FileViewer
                    {...file}
                    trigger={() => <span className='text-chart-2 italic font-bold hover:underline hover:cursor-pointer'>{file.name}</span>}
                    actions={({ close }) => (
                      <div className='w-full flex justify-end items-center gap-4'>
                        <Button onClick={openInput}>Adjuntar otra imagen</Button>
                        <Button
                          variant='destructive'
                          onClick={() => {
                            close()
                            onChange(undefined)
                            setFile(undefined)
                          }}
                        >
                          Eliminar imagen adjunta
                        </Button>
                        <Button
                          variant='secondary'
                          onClick={close}
                        >
                          Cerrar
                        </Button>
                      </div>
                    )}
                  />
                ) : null
              ) : (
                <span className='text-orange-500 italic'>Aún no se adjuntó una imagen</span>
              )}
            </p>
          </div>
        </FormItem>
      )}
    />
  )
}
