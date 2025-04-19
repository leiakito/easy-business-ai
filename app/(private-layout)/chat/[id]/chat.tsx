'use client'

import React, { useRef, useEffect, useState } from 'react'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

import { useChat } from '@/actions/chat.client'
import { getConversationsWithMessages } from '@/actions/conversation'
import { CopyButton } from '@/components/mdx/copy-button'
import Submit from '@/components/submit'
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

  if (!isInitialized) return

  return (
    <div className="flex h-full flex-col">
      <div
        ref={scrollRef}
        className="relative h-full w-full flex-grow overflow-x-hidden overflow-y-scroll scrollbar-hide"
      >
        <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-1 flex-col-reverse justify-end gap-4 md:gap-8">
          {!messages?.length ? (
            <div className="text-xl font-medium text-gray-700 dark:text-gray-200">
              <MessageItem
                message={{
                  id: 'firstMessage',
                  role: 'assistant',
                  content: settings.openingMessage ?? 'Welcome to the chat! Type your message to begin.'
                }}
              />
            </div>
          ) : (
            messages.map((message) => <MessageItem key={message.id} message={message} />)
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
    user: 'bg-secondary text-secondary-foreground shadow-md ml-auto',
    assistant: 'bg-primary text-primary-foreground shadow-md mr-auto'
  }
  const [isHovered, setIsHovered] = useState(false)

  const isUser = message.role === 'user'

  const renderedContent = remark()
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(remarkHtml)
    .processSync(message.content)
    .toString()

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-fit ${isUser ? 'self-end' : 'self-start'}`}
    >
      <div
        dangerouslySetInnerHTML={{ __html: renderedContent }}
        className={`prose prose-invert rounded-lg px-4 py-2 dark:prose-neutral ${roleStyles[message.role]}`}
      />
      <div
        className={`absolute right-2 top-2 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      >
        <CopyButton>{message.content}</CopyButton>
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
