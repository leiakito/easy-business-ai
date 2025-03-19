'use client'

import { useRef, useEffect, useCallback } from 'react'

import { useChat } from '@/actions/chat.client'
import { getConversationsWithMessages } from '@/actions/conversation'
import Submit from '@/components/submit'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { ChatItem, DEFAULT_CHAT_SETTINGS, useChatStore } from '@/store/chat.store'

type ChatProps = {
  conversationId: string
  settings: {
    systemPrompt: string
    model: string
    openingMessage?: string
  }
  lastMessageId?: string
}

export default function Chat({ conversationId, settings, lastMessageId }: ChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const sessions = useChatStore((state) => state.sessionsMessages)
  const addSession = useChatStore((i) => i.addSession)
  const setChatSetting = useChatStore((state) => state.setChatSetting)
  const sessionsChatSettings = useChatStore((state) => state.sessionsChatSettings)
  const isInitialized = useChatStore((i) => i.isInitialized)

  const getMessages = useCallback(async () => {
    const currentSession = sessions[conversationId]

    if (!currentSession) return

    if (lastMessageId && currentSession?.lastMessageId === lastMessageId) {
      return
    }

    try {
      const res = await getConversationsWithMessages(conversationId)

      if (res && res.messages.length > 0) {
        addSession({
          conversationId,
          lastMessageId: res.messages[res.messages.length - 1].id,
          messages: (res.messages as any) || []
        })
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    }
  }, [addSession, conversationId, lastMessageId, sessions])

  useEffect(() => {
    if (isInitialized) getMessages()
  }, [getMessages, isInitialized])

  const messages = sessions[conversationId]?.messages

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }

  useEffect(() => {
    if (!sessionsChatSettings[conversationId]) {
      setChatSetting(
        { ...DEFAULT_CHAT_SETTINGS, model: settings.model, systemPrompt: settings.systemPrompt },
        conversationId
      )
    }
  }, [])

  return (
    <>
      <div
        ref={scrollRef}
        className="flex h-0 flex-grow flex-col-reverse items-start gap-4 overflow-y-auto scrollbar-hide md:gap-8"
      >
        <div className="flex-1" />
        {!messages?.length ? (
          <div className="text-xl font-medium text-gray-700 dark:text-gray-200">
            {settings.openingMessage ?? 'Welcome to the chat!'}
          </div>
        ) : (
          messages
            .slice()
            .reverse()
            .map((message) => <MessageItem key={message.id} message={message} />)
        )}
      </div>
      <ChatInput id={conversationId} scrollToBottom={scrollToBottom} />
    </>
  )
}

type MessageItemProps = {
  message: ChatItem
}

function MessageItem({ message }: MessageItemProps) {
  const roleStyles: Record<string, string> = {
    user: 'bg-blue-100 dark:bg-blue-900 ml-auto',
    assistant: 'bg-green-100 dark:bg-green-900 mr-auto'
  }

  const isUser = message.role === 'user'

  return (
    <div className={`flex w-full flex-col ${isUser ? 'items-end' : 'items-start'}`}>
      <div
        className={`flex max-w-[90%] flex-col gap-2 rounded-lg p-4 ${roleStyles[message.role]} ${
          isUser ? '' : 'w-full'
        }`}
      >
        {message.content ? (
          <p
            className={`whitespace-pre-wrap text-slate-900 dark:text-slate-300 ${isUser ? 'text-right' : 'text-left'}`}
          >
            {message.content}
          </p>
        ) : (
          <div className="flex w-full flex-col gap-3">
            <Skeleton className="h-[20px] w-full rounded-md" />
            <Skeleton className="h-[20px] w-[60%] rounded-md" />
          </div>
        )}
      </div>
    </div>
  )
}

type ConversationComponent = {
  id: string
  scrollToBottom: () => void
}

function ChatInput({ id, scrollToBottom }: ConversationComponent) {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const { createCompletion } = useChat(id)

  async function handleSubmit(formData: FormData) {
    const message = formData.get('message') as string
    if (!message) return

    if (inputRef.current) {
      inputRef.current.value = ''
    }
    await createCompletion(message, scrollToBottom)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      formRef.current?.requestSubmit()
    }
  }

  return (
    <form ref={formRef} action={handleSubmit} className="flex flex-row items-center gap-2 pb-5">
      <Textarea
        ref={inputRef}
        autoComplete="off"
        name="message"
        placeholder="Ask me something..."
        className="min-h-12 resize-none"
        maxRows={5}
        onKeyDown={handleKeyDown}
      />
      <Submit />
    </form>
  )
}
