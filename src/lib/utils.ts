import bcryptjs from 'bcryptjs'

import { faker } from '@faker-js/faker'
import { clsx, type ClassValue } from 'clsx'
import { decode, JwtPayload, sign } from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { twMerge } from 'tailwind-merge'

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

export const generateAccessToken = (name: string) => {
  return sign({ name }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' })
}

export const generateRefreshToken = (name: string) => sign({ name }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '1d' })

export const generateRandomNickname = () => {
  const word = faker.word.noun({ length: { min: 3, max: 4 } })
  const suffix = Math.random().toString(36).substring(2, 6)
  const name = (word + suffix).substring(0, 6)
  return name
}

export const getNameFromNextRequest = (req: NextRequest): string => {
  const access = req.cookies.get('access')!.value
  const { name } = decode(access) as JwtPayload & { name: string }
  return name
}

export const setTokensOnNextResponse = (res: NextResponse, access: string, refresh: string): void => {
  res.cookies.set('access', access, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60
  })
  res.cookies.set('refresh', refresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60
  })
}
