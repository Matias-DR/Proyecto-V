import bcryptjs from 'bcryptjs'

import { faker } from '@faker-js/faker'
import { clsx, type ClassValue } from 'clsx'
import { JwtPayload, sign, verify } from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { twMerge } from 'tailwind-merge'

import { User } from '@/core/user'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const hashPassword = async (password: string): Promise<string> => {
  const salt = bcryptjs.genSaltSync(Number(process.env.PASSWORD_SALT_ROUNDS))
  return bcryptjs.hashSync(password, salt)
}

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcryptjs.compareSync(password, hashedPassword)
}

export const generateAccessToken = (user: User) => sign({ user }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' })

export const generateRefreshToken = (user: User) => sign({ user }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' })

export const generateRandomNickname = () => {
  const word = faker.word.noun({ length: { min: 3, max: 4 } })
  const suffix = Math.random().toString(36).substring(2, 6)
  const name = (word + suffix).substring(0, 6)
  return name
}

export const setTokensOnNextResponse = (res: NextResponse, access: string, refresh: string): void => {
  res.cookies.set('access', access, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 15
  })
  res.cookies.set('refresh', refresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7
  })
}

export const getUserFromNextRequest = (req: NextRequest, accessTokenSecret: string): User => {
  const access = req.cookies.get('access')!.value
  const { user } = verify(access, accessTokenSecret) as JwtPayload & { user: User }
  return user
}

export const formatURL = (url: string, parameters?: object): string => {
  if (!parameters || Object.entries(parameters).length === 0) return url

  let formattedUrl = url
  const searchParams = new URLSearchParams()

  Object.entries(parameters).forEach(([key, value]) => {
    const placeholder = `{${key}}`

    if (value === null || value === undefined) return

    if (formattedUrl.includes(placeholder)) {
      formattedUrl = formattedUrl.replace(placeholder, String(value))
    } else {
      searchParams.append(key, String(value))
    }
  })

  const queryString = searchParams.toString()
  if (queryString !== '') {
    formattedUrl += formattedUrl.includes('?') ? '&' : '?'
    formattedUrl += queryString
  }

  return formattedUrl
}
