import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { RANDOM_ID_CHARACTERS } from '@/constant/config'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

// for development purpose
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

export function generateRandomId(length: number) {
  const characters = RANDOM_ID_CHARACTERS
  let randomId = ''
  const timestamp = Date.now().toString()

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomId += characters.charAt(randomIndex)
  }
  return randomId + timestamp
}
