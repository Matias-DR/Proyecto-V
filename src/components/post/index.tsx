import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Post as PostType } from '@/core/post'
import { FRONTEND_URL } from '@/infra/config'

export interface Props {
  data: PostType
}

const Post = ({ data }: Props) => {
  const { _id, description, image, name, category, country, region } = data

  return (
    <div className='size-full p-2 flex flex-col gap-1 border border-blue-300 rounded-lg'>
      <Dialog>
        <DialogTrigger>
          <div className='relative w-full h-48 overflow-hidden border border-blue-300 rounded-md hover:cursor-pointer'>
            <Image
              src={`${FRONTEND_URL}/api/post/image/${image}`}
              alt={name}
              fill
              className='absolute object-contain'
            />
          </div>
        </DialogTrigger>
        <DialogContent className='max-w-[97.5%] flex flex-row bg-transparent border-blue-300'>
          <div className='relative !size-[28vw] overflow-hidden border border-blue-300 rounded-md'>
            <Image
              src={`${FRONTEND_URL}/api/post/image/${image}`}
              alt={name}
              fill
              className='absolute object-contain'
            />
          </div>
          <div className='flex-1 flex flex-col gap-3'>
            <DialogHeader>
              <DialogTitle className='text-4xl line-clamp-1'>{name}</DialogTitle>
              <ScrollArea
                vpClassName='p-0'
                className='flex-1'
              >
                <DialogDescription className='max-h-[40vh] text-base text-white'>{description}</DialogDescription>
              </ScrollArea>
            </DialogHeader>
            <div className='flex flex-col gap-2'>
              <ScrollArea
                vpClassName='p-0'
                className='flex-1 pb-3'
              >
                <div className='max-w-[64vw] flex gap-1'>
                  <span>Categorías:</span>
                  {category &&
                    category.map((category) => (
                      <Badge key={`${category}-${_id}`}>
                        <span className='truncate'>{category}</span>
                      </Badge>
                    ))}
                </div>
                <ScrollBar orientation='horizontal' />
              </ScrollArea>
              <ScrollArea
                vpClassName='p-0'
                className='flex-1 pb-3'
              >
                <div className='max-w-[64vw] flex gap-1'>
                  <span>Continentes:</span>
                  {region &&
                    region.map((region) => (
                      <Badge key={`${region}-${_id}`}>
                        <span className='truncate'>{region}</span>
                      </Badge>
                    ))}
                </div>
                <ScrollBar orientation='horizontal' />
              </ScrollArea>

              <ScrollArea
                vpClassName='p-0'
                className='flex-1 pb-3'
              >
                <div className='max-w-[64vw] flex gap-1'>
                  <span>Países:</span>
                  {country &&
                    country.map((country) => (
                      <Badge key={`${country}-${_id}`}>
                        <span className='truncate'>{country}</span>
                      </Badge>
                    ))}
                </div>
                <ScrollBar orientation='horizontal' />
              </ScrollArea>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <h1 className='text-center text-2xl font-bold line-clamp-1'>{name}</h1>
      <ScrollArea
        vpClassName='p-0'
        className='flex-1'
      >
        <p className='max-h-32 text-wrap break-words'>{description}</p>
      </ScrollArea>
      <div className='flex items-center gap-2'>
        {category && category.length > 0 && (
          <Badge className='relative max-w-[31%]'>
            <span className='truncate'>{category}</span>
            {category.length > 1 && (
              <span className='absolute -top-1 -right-1 inline-flex w-auto h-3 px-0.5 pb-[14px] rounded-full bg-blue-500 text-white text-[10px]'>
                +{category.length - 1}
              </span>
            )}
          </Badge>
        )}
        {region && region.length > 0 && (
          <Badge className='relative max-w-[31%]'>
            <span className='truncate'>{region}</span>
            {region.length > 1 && (
              <span className='absolute -top-1 -right-1 inline-flex w-auto h-3 px-0.5 pb-[14px] rounded-full bg-blue-500 text-white text-[10px]'>
                +{region.length - 1}
              </span>
            )}
          </Badge>
        )}
        {country && country.length > 0 && (
          <Badge className='relative max-w-[31%]'>
            <span className='truncate'>{country}</span>
            {country.length > 1 && (
              <span className='absolute -top-1 -right-1 inline-flex w-auto h-3 px-0.5 pb-[14px] rounded-full bg-blue-500 text-white text-[10px]'>
                +{country.length - 1}
              </span>
            )}
          </Badge>
        )}
      </div>
    </div>
  )
}

export default Post
