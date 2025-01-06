'use client'

import { useRouter } from 'next/navigation'

import { newChat } from '@/actions/chat'
import { generateRandomId } from '@/lib/utils'

import { Button } from './ui/button'

function NegativeChat() {
  const router = useRouter()
  function toChat() {
    const chatId = generateRandomId(24)
    router.push(`/chat/${chatId}`)
    newChat(chatId)
  }
  return (
    <Button onClick={toChat} variant="link" size="sm">
      <span>New chat</span>
    </Button>
  )
}

export default NegativeChat
