import { User } from '@/core/user'
import { CATEGORIES, CONTINENTS, COUNTRIES } from '@/lib/constants'

export type Category = (typeof CATEGORIES)[number]

export type Region = (typeof CONTINENTS)[number]

export type Country = (typeof COUNTRIES)[number]

export interface Post {
  _id: string
  user: User['_id']
  name: string
  category: Category[]
  description: string
  region: Region[]
  country: Country[]
  image: string
  likes: User['name'][]
}
