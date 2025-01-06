'use client'

import { Loader2Icon, SendHorizonalIcon } from 'lucide-react'
import { useFormStatus } from 'react-dom'

import { Button } from './ui/button'

export default function Submit() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" variant="secondary" size="icon" className="h-12 w-12">
      {pending ? <Loader2Icon className="h-5 w-5 animate-spin" /> : <SendHorizonalIcon className="h-5 w-5" />}
    </Button>
  )
}
