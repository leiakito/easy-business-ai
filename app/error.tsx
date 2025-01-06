'use client'

import { useEffect } from 'react'

import { Button } from '@/components/ui/button'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error.message)
  }, [error])

  return (
    <div className="flex flex-col items-start gap-3 pt-6">
      <h2 className="text-2xl font-semibold">Something went wrong!</h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}
