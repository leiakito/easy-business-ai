'use client'

import React, { useRef, useEffect } from 'react'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

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

  const getMessages = async () => {
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
  }

  useEffect(() => {
    if (isInitialized) getMessages()
  }, [isInitialized])

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
    <div ref={scrollRef} className="flex h-full flex-col">
      <div className="relative h-full w-full flex-grow">
        <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-1 flex-col-reverse gap-4 overflow-y-auto overflow-x-hidden scrollbar-hide md:gap-8">
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
      </div>
      <ChatInput id={conversationId} scrollToBottom={scrollToBottom} />
    </div>
  )
}

type MessageItemProps = {
  message: ChatItem
}

function MessageItem({ message }: MessageItemProps) {
  const roleStyles: Record<string, string> = {
    user: 'prose-slate bg-gray-300 dark:bg-stone-50 ml-auto',
    assistant: 'prose-stone bg-gray-50 dark:bg-blue-100 mr-auto'
  }
  const isUser = message.role === 'user'

  const renderedContent = remark()
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(remarkHtml)
    .processSync(message.content)
    .toString()

  return (
    <div className={`flex w-full flex-col ${isUser ? 'items-end' : 'items-start'}`}>
      {renderedContent ? (
        <div
          dangerouslySetInnerHTML={{ __html: renderedContent }}
          className={`prose max-w-[90%] rounded-lg p-4 ${roleStyles[message.role]}`}
        />
      ) : (
        <div className="flex w-full flex-col gap-3">
          <Skeleton className="h-[20px] w-full rounded-md" />
          <Skeleton className="h-[20px] w-[60%] rounded-md" />
        </div>
      )}
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
    <form ref={formRef} action={handleSubmit} className="flex w-full flex-row items-center gap-2 py-5">
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
