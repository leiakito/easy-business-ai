'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { getConversationsWithMessages } from '@/actions/conversation'
import { useChatStore } from '@/store/chat.store'

import Chat from './chat'

export default function ChatSpecificPage() {
  const search = useSearchParams()
  const { id } = useParams<{
    id: string
  }>()

  const sessions = useChatStore((i) => i.sessionsMessages)
  const addSession = useChatStore((i) => i.addSession)

  const getMessages = async () => {
    const lastMessageId = search.get('lastMessageId')
    const currentSession = sessions[id]

    if (!currentSession) return

    if (lastMessageId && currentSession?.lastMessageId === lastMessageId) {
      return
    }

    try {
      const res = await getConversationsWithMessages(id)
      if (res) {
        addSession({
          conversationId: id,
          messages: (res.messages as any) || []
        })
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    }
  }

  useEffect(() => {
    getMessages()
  }, [])

  return <Chat id={id} />
}
