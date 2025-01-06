'use client'

import { useRouter } from 'next/navigation'

import { Button } from './ui/button'

function NegativePricing() {
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

export default NegativePricing
