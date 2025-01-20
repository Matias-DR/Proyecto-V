import bcryptjs from 'bcryptjs'

import { clsx, type ClassValue } from 'clsx'
import { sign } from 'jsonwebtoken'
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

export const generateAccessToken = (name: string) => sign({ name }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' })

export const generateRefreshToken = (name: string) => sign({ name }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '1d' })
