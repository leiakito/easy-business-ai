'use client'

import { useRouter } from 'next/navigation'

import { newChat } from '@/actions/chat'
import { generateRandomId } from '@/lib/utils'

function NegativeChat({ className }: { className?: string }) {
  const router = useRouter()
  function toChat() {
    const chatId = generateRandomId(24)
    router.push(`/chat/${chatId}`)
    newChat(chatId)
  }
  return (
    <div onClick={toChat} className={className}>
      <span>New chat</span>
    </div>
  )
}

export default NegativeChat
