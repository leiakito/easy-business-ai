'use client'

import { useRouter } from 'next/navigation'

import { newChat } from '@/actions/chat'
import { generateRandomId } from '@/lib/utils'
import { useChatStore } from '@/store/chat.store'

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

export function NegativeChat() {
  const router = useRouter()
  const addSession = useChatStore((i) => i.addSession)

  function toChat() {
    const chatId = generateRandomId(24)
    addSession({
      conversationId: chatId,
      messages: []
    })
    newChat(chatId)
    router.push(`/chat/${chatId}`)
  }
  return (
    <Button onClick={toChat} variant="link" size="sm">
      <span>New chat</span>
    </Button>
  )
}
