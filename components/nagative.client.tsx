'use client'

import { useRouter } from 'next/navigation'

import { Button } from './ui/button'

export function NegativePricing() {
  const router = useRouter()
  function toPricing() {
    router.push('/pricing')
  }
  return (
    <Button onClick={toPricing} variant="link" size="sm">
      <span>Pricing</span>
    </Button>
  )
}

export function NegativeHome() {
  const router = useRouter()
  function toPricing() {
    router.push('/')
  }
  return (
    <Button onClick={toPricing} variant="link" size="sm">
      <span>Home</span>
    </Button>
  )
}
